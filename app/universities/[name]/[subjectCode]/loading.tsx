export default function Loading() {
  return (
    <main className="px-4 md:px-6 lg:px-15 py-8 mt-5">
      <div className="max-w-7xl mx-auto">
        {/* Subject Details Section */}
        <div className="bg-white border rounded-lg p-6 mb-8 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="h-5 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-14 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-8"></div>
            </div>
          </div>

          <div>
            <div className="h-5 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          </div>
        </div>

        {/* Reviews Section Header */}
        <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Reviews List */}
          <div className="flex-1">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border rounded-lg p-6 animate-pulse">
                  {/* Review Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-5 bg-gray-200 rounded w-20"></div>
                        <div className="h-5 bg-gray-200 rounded w-8"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded-full w-28"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>

                  {/* Review Content */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j}>
                        <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 animate-pulse">
              <div className="flex gap-2">
                <div className="h-10 bg-gray-200 rounded w-20"></div>
                <div className="h-10 bg-gray-200 rounded w-10"></div>
                <div className="h-10 bg-gray-200 rounded w-10"></div>
                <div className="h-10 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>

          {/* Review Stats Sidebar */}
          <div className="lg:w-xl">
            <div className="bg-white border rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>

              {/* Average Rating */}
              <div className="text-center mb-6">
                <div className="flex items-center gap-3 justify-center mb-4">
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-12"></div>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-4 mb-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rating Distribution Chart */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
