export default function EventsLoading() {
  return (
    <div className="page-container">
      {/* Skeleton for Events Header */}
      <div className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="h-10 w-64 bg-gray-700 animate-pulse rounded mx-auto mb-6"></div>
          <div className="h-4 bg-gray-700 animate-pulse rounded max-w-3xl mx-auto mb-2"></div>
          <div className="h-4 bg-gray-700 animate-pulse rounded max-w-2xl mx-auto mb-2"></div>
          <div className="h-4 bg-gray-700 animate-pulse rounded max-w-xl mx-auto"></div>
        </div>
      </div>
      
      {/* Skeleton for Events Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Skeleton for Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-6"></div>
                
                <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mr-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                      <div className="h-4 w-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Skeleton for Events Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="relative h-60 w-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-4"></div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-3/4"></div>
                      </div>
                      
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-2"></div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {[...Array(3)].map((_, j) => (
                          <div key={j} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
