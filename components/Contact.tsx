export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-2">Visit Us Today</h2>
          <div className="h-1 w-32 bg-[#FFC107] rounded mx-auto mb-4" />
          <p className="text-gray-500">Walk in or call ahead — we&apos;re always ready to help.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:border-[#FFC107] transition-colors">
            <div className="flex justify-center mb-4">
              <svg className="w-8 h-8 text-[#FFC107]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-3 text-black">Location</h3>
            <p className="text-gray-600">482 Rt-9 South<br />Freehold, NJ 07728</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-4 text-sm font-semibold text-[#c9a000] hover:underline">
              Get Directions &rarr;
            </a>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:border-[#FFC107] transition-colors">
            <div className="flex justify-center mb-4">
              <svg className="w-8 h-8 text-[#FFC107]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-3 text-black">Call Us</h3>
            <a href="tel:+17325550192" className="text-2xl font-black text-black hover:text-[#c9a000] transition-colors">
              (732) 555-0192
            </a>
            <p className="text-gray-500 text-sm mt-3">Talk to a real person, not a robot.</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:border-[#FFC107] transition-colors">
            <div className="flex justify-center mb-4">
              <svg className="w-8 h-8 text-[#FFC107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-3 text-black">Hours</h3>
            <div className="text-gray-600 space-y-1 text-sm">
              <p><span className="font-semibold text-black">Mon–Fri:</span> 9:00 AM – 7:00 PM</p>
              <p><span className="font-semibold text-black">Saturday:</span> 9:00 AM – 6:00 PM</p>
              <p><span className="font-semibold text-black">Sunday:</span> 11:00 AM – 4:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-[#1a1a1a] rounded-2xl p-10 text-center text-white">
          <h3 className="text-3xl font-black mb-3">Ready to Drive Home Today?</h3>
          <p className="text-gray-400 mb-6 text-lg">Stop by or call us. Same-day approval available.</p>
          <a href="tel:+17325550192"
            className="inline-block bg-[#FFC107] hover:bg-yellow-400 text-black font-black px-10 py-4 rounded-lg text-xl transition-colors">
            Call (732) 555-0192
          </a>
        </div>
      </div>
    </section>
  );
}
