import { CheckCircle, Clock, Plus, User } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Actionable Inbox</h1>
        <p className="text-lg text-gray-600">Manage your tasks efficiently and stay productive</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Sample Tasks */}
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Review quarterly reports</h3>
                    <p className="text-sm text-gray-500">Due: Feb 15, 2024 • High Priority</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      High
                    </span>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Update project documentation</h3>
                    <p className="text-sm text-gray-500">Due: Feb 10, 2024 • Medium Priority</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Medium
                    </span>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-green-50 rounded-lg opacity-75">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900 line-through">Fix critical bug in production</h3>
                    <p className="text-sm text-gray-500">Completed • Was: Urgent Priority</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Done
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                View All Tasks
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                Filter by Priority
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                Export Tasks
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-full">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>Actionable Inbox - Built with Next.js, Express, and PostgreSQL</p>
      </footer>
    </div>
  )
}
