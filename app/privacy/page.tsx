import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            गोपनीयता नीति
          </h1>
          
          <div className="prose max-w-none">
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  परिचय
                </h2>
                <p>
                  देश आज न्यूज़ आपकी गोपनीयता का सम्मान करता है। यह गोपनीयता नीति बताती है कि हम आपकी व्यक्तिगत जानकारी को कैसे एकत्र, उपयोग और सुरक्षित करते हैं।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  जानकारी का संग्रह
                </h2>
                <p>
                  हम निम्नलिखित प्रकार की जानकारी एकत्र कर सकते हैं:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>आपके द्वारा प्रदान की गई व्यक्तिगत जानकारी</li>
                  <li>आपके ब्राउज़र से स्वचालित रूप से एकत्र की गई जानकारी</li>
                  <li>कुकीज़ और समान तकनीकों के माध्यम से एकत्र की गई जानकारी</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  जानकारी का उपयोग
                </h2>
                <p>
                  हम आपकी जानकारी का उपयोग निम्नलिखित उद्देश्यों के लिए करते हैं:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>हमारी सेवाओं को प्रदान करने और सुधारने के लिए</li>
                  <li>आपके साथ संवाद करने के लिए</li>
                  <li>व्यक्तिगत अनुभव प्रदान करने के लिए</li>
                  <li>सुरक्षा और धोखाधड़ी की रोकथाम के लिए</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  जानकारी की सुरक्षा
                </h2>
                <p>
                  हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए उपयुक्त तकनीकी और संगठनात्मक उपाय करते हैं। हालाँकि, कोई भी इंटरनेट ट्रांसमिशन या इलेक्ट्रॉनिक भंडारण 100% सुरक्षित नहीं है।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  कुकीज़
                </h2>
                <p>
                  हमारी वेबसाइट कुकीज़ का उपयोग करती है। कुकीज़ छोटी फाइलें हैं जो आपके कंप्यूटर पर संग्रहीत होती हैं और हमें आपके अनुभव को बेहतर बनाने में मदद करती हैं।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  संपर्क
                </h2>
                <p>
                  यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:
                </p>
                <p className="mt-2">
                  ईमेल: privacy@deshaaj.com<br />
                  पता: देश आज न्यूज़, नई दिल्ली, भारत
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  नीति में परिवर्तन
                </h2>
                <p>
                  हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। किसी भी परिवर्तन के मामले में, हम इस पृष्ठ पर नई नीति पोस्ट करेंगे।
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


