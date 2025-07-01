export default function EventLoading() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Skeleton for Event Header Image */}
      <div className="relative h-[40vh] md:h-[60vh] bg-gray-300 dark:bg-gray-700 animate-pulse">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="container mx-auto px-4 py-8">
            <div className="h-10 w-64 bg-gray-500 animate-pulse rounded mb-4"></div>
            <div className="flex flex-wrap gap-4">
              <div className="h-6 w-32 bg-gray-500 animate-pulse rounded"></div>
              <div className="h-6 w-32 bg-gray-500 animate-pulse rounded"></div>
              <div className="h-6 w-32 bg-gray-500 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Skeleton for Event Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content skeleton */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-48 mb-4"></div>
                
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-3/4"></div>
                </div>
                
                <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-48 mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3"></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-32 mb-4"></div>
                <div className="h-14 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full"></div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-40 mb-4"></div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full mr-3"></div>
                    <div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-32 mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full mr-3"></div>
                    <div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-32 mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
