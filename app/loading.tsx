export default function Loading() {
  return (
    <main className="px-4 md:px-6 lg:px-15">
      <div className="flex flex-col gap-16 px-8 py-24 text-center">
        <div className="flex flex-col items-center justify-center gap-8 animate-pulse">
          {/* Announcement */}
          <div className="h-8 bg-gray-200 rounded-full w-40"></div>

          {/* Main Heading */}
          <div className="flex flex-col gap-4">
            <div className="h-16 bg-gray-200 rounded w-96 mx-auto"></div>
            <div className="h-16 bg-gray-200 rounded w-80 mx-auto"></div>
          </div>

          {/* Button */}
          <div className="h-10 bg-gray-200 rounded w-40"></div>
        </div>

        {/* Marquee Section */}
        <section className="flex flex-col items-center justify-center gap-8 rounded-xl bg-secondary py-8 pb-18 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-64"></div>

          <div className="flex items-center justify-center gap-16">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="size-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}