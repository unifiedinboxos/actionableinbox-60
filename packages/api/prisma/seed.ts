import { PrismaClient, Priority } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: "john.doe@example.com" },
    update: {},
    create: {
      email: "john.doe@example.com",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: "jane.smith@example.com" },
    update: {},
    create: {
      email: "jane.smith@example.com",
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
  })

  // Create sample tasks
  const tasks = [
    {
      title: "Review quarterly reports",
      description: "Go through Q4 financial reports and prepare summary",
      priority: Priority.HIGH,
      dueDate: new Date("2024-02-15"),
      userId: user1.id,
    },
    {
      title: "Update project documentation",
      description: "Update the README and API documentation for the new features",
      priority: Priority.MEDIUM,
      dueDate: new Date("2024-02-10"),
      userId: user1.id,
    },
    {
      title: "Schedule team meeting",
      description: "Organize weekly sync meeting with the development team",
      priority: Priority.LOW,
      dueDate: new Date("2024-02-08"),
      userId: user2.id,
    },
    {
      title: "Fix critical bug in production",
      description: "Address the authentication issue reported by users",
      priority: Priority.URGENT,
      dueDate: new Date("2024-02-05"),
      userId: user2.id,
      completed: true,
    },
    {
      title: "Prepare presentation slides",
      description: "Create slides for the upcoming client presentation",
      priority: Priority.HIGH,
      dueDate: new Date("2024-02-12"),
      userId: user1.id,
    },
  ]

  for (const task of tasks) {
    await prisma.task.upsert({
      where: { id: "dummy-id-" + tasks.indexOf(task) },
      update: {},
      create: task,
    })
  }

  console.log("✅ Database seeded successfully!")
  console.log(`👤 Created ${await prisma.user.count()} users`)
  console.log(`📋 Created ${await prisma.task.count()} tasks`)
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
