export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-50 via-white to-red-50 border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="max-w-3xl">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-700 tracking-tight leading-relaxed"
            style={{ fontFamily: 'var(--font-roboto-slab)' }}
          >
            <div>देश आज – आपकी ताज़ा ख़बरें,</div>
            <div className="mt-2">विश्लेषण और खास रिपोर्ट</div>
          </h1>
          <p
            className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-700"
            style={{ fontFamily: 'var(--font-open-sans)' }}
          >
            भरोसेमंद और तेज़ खबरें — राजनीति, व्यवसाय, खेल और शेयर बाज़ार की
            सबसे अहम सुर्खियाँ एक ही जगह।
          </p>
          <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-full bg-red-600/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-red-600" />
            <span className="text-red-700 text-xs sm:text-sm font-semibold" style={{ fontFamily: 'var(--font-open-sans)' }}>
              ब्रेकिंग अपडेट्स लाइव
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}




