export default function Loading() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 animate-pulse">
        {/* Header with Logo */}
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-md size-6"></div>
            <div className="h-5 bg-gray-200 rounded w-20"></div>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm space-y-6">
            {/* Form Title */}
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>

            {/* Submit Button */}
            <div className="h-10 bg-gray-200 rounded w-full"></div>

            {/* Additional Links */}
            <div className="space-y-2 text-center">
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="bg-gray-200 relative hidden lg:block animate-pulse">
        <div className="absolute inset-0 h-full w-full bg-gray-300"></div>
      </div>
    </div>
  );
}