import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"

// Load environment variables
dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const prisma = new PrismaClient()

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
})

// Middleware
app.use(helmet())
app.use(compression())
app.use(limiter)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// API Routes
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        createdAt: true,
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    })
    res.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.get("/api/tasks", async (req, res) => {
  try {
    const { userId, completed, priority } = req.query

    const where: any = {}
    if (userId) where.userId = userId as string
    if (completed !== undefined) where.completed = completed === "true"
    if (priority) where.priority = priority as string

    const tasks = await prisma.task.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [{ completed: "asc" }, { priority: "desc" }, { dueDate: "asc" }, { createdAt: "desc" }],
    })

    res.json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description, priority, dueDate, userId } = req.body

    if (!title || !userId) {
      return res.status(400).json({ error: "Title and userId are required" })
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    res.status(201).json(task)
  } catch (error) {
    console.error("Error creating task:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, completed, priority, dueDate } = req.body

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
        ...(priority !== undefined && { priority }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    res.json(task)
  } catch (error) {
    console.error("Error updating task:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params

    await prisma.task.delete({
      where: { id },
    })

    res.status(204).send()
  } catch (error) {
    console.error("Error deleting task:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled error:", err)
  res.status(500).json({ error: "Internal server error" })
})

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Received SIGINT, shutting down gracefully...")
  await prisma.$disconnect()
  process.exit(0)
})

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM, shutting down gracefully...")
  await prisma.$disconnect()
  process.exit(0)
})

app.listen(port, () => {
  console.log(`🚀 API server running on http://localhost:${port}`)
  console.log(`📊 Health check available at http://localhost:${port}/health`)
})

export default app
