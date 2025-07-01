export default function Newsletter() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[#131305] opacity-80 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-[#1d2107] p-12 rounded-sm border-l-4 border-[#a3ff12]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            We welcome all interested souls<br />
            <span className="text-gray-400 font-normal">to get in touch with us.</span>
          </h2>
          
          <form className="max-w-md">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-black/50 text-white px-4 py-3 flex-grow focus:outline-none focus:ring-1 focus:ring-[#a3ff12]"
                required
              />
              <button
                type="submit"
                className="bg-[#a3ff12] text-black px-6 py-3 font-bold uppercase tracking-wider hover:bg-[#83cc0f] transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
