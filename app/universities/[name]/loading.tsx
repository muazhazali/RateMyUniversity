export default function Loading() {
  return (
    <main className="px-4 md:px-6 lg:px-15 py-8 mt-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
        </div>

        {/* Filters Section */}
        <div className="mb-6 animate-pulse">
          <div className="flex gap-4 mb-4">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded flex-1 max-w-md"></div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border rounded-lg p-4 animate-pulse">
              {/* Subject Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </div>
              </div>
              {/* Subject Name */}
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              {/* Faculty */}
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              {/* Badges */}
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center animate-pulse">
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 rounded w-20"></div>
            <div className="h-10 bg-gray-200 rounded w-10"></div>
            <div className="h-10 bg-gray-200 rounded w-10"></div>
            <div className="h-10 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
