export default function Contact() {
  return (
    <section id="contact" className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-2">Visit Us</p>
          <h2 className="text-4xl font-black">Come See Us Today</h2>
          <p className="text-gray-400 mt-3 text-lg">Walk in or call ahead — we&apos;re always ready.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          {/* Address */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-red-600 transition-colors">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="font-bold text-lg mb-3 text-red-500">Location</h3>
            <p className="text-gray-300">
              482 Rt-9 South<br />
              Freehold, NJ 07728
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-red-400 hover:text-red-300 underline"
            >
              Get Directions →
            </a>
          </div>

          {/* Phone */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-red-600 transition-colors">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="font-bold text-lg mb-3 text-red-500">Call Us</h3>
            <a href="tel:+17325550192" className="text-2xl font-black text-white hover:text-red-400 transition-colors">
              (732) 555-0192
            </a>
            <p className="text-gray-400 text-sm mt-3">
              Talk to a real person, not a robot.
            </p>
          </div>

          {/* Hours */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-red-600 transition-colors">
            <div className="text-4xl mb-4">🕐</div>
            <h3 className="font-bold text-lg mb-3 text-red-500">Hours</h3>
            <div className="text-gray-300 space-y-1 text-sm">
              <p><span className="font-semibold text-white">Mon–Fri:</span> 9:00 AM – 7:00 PM</p>
              <p><span className="font-semibold text-white">Saturday:</span> 9:00 AM – 6:00 PM</p>
              <p><span className="font-semibold text-white">Sunday:</span> 11:00 AM – 4:00 PM</p>
            </div>
          </div>
        </div>

        {/* CTA bar */}
        <div className="mt-14 text-center bg-red-600 rounded-2xl p-10">
          <h3 className="text-3xl font-black mb-3">Ready to Drive Home Today?</h3>
          <p className="text-red-100 mb-6 text-lg">Stop by or call us now. Same-day approval available.</p>
          <a
            href="tel:+17325550192"
            className="inline-block bg-white text-red-600 hover:bg-gray-100 font-black px-10 py-4 rounded-lg text-xl transition-colors"
          >
            Call (732) 555-0192
          </a>
        </div>
      </div>
    </section>
  );
}
