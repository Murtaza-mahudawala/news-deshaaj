import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            सेवा की शर्तें
          </h1>
          
          <div className="prose max-w-none">
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  स्वीकृति
                </h2>
                <p>
                  देश आज न्यूज़ वेबसाइट का उपयोग करके, आप इन सेवा की शर्तों से सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया हमारी वेबसाइट का उपयोग न करें।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  सेवा का उपयोग
                </h2>
                <p>
                  आप हमारी सेवा का उपयोग केवल कानूनी उद्देश्यों के लिए कर सकते हैं। आप निम्नलिखित कार्य नहीं कर सकते:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>किसी भी कानून या नियम का उल्लंघन करना</li>
                  <li>अन्य उपयोगकर्ताओं के अधिकारों का उल्लंघन करना</li>
                  <li>हानिकारक या वायरस युक्त सामग्री अपलोड करना</li>
                  <li>स्पैम या अनचाहे संदेश भेजना</li>
                  <li>हमारी सेवा की सुरक्षा को खतरे में डालना</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  बौद्धिक संपदा
                </h2>
                <p>
                  हमारी वेबसाइट पर सभी सामग्री, जिसमें लेख, चित्र, वीडियो और अन्य मीडिया शामिल हैं, देश आज न्यूज़ की बौद्धिक संपदा है। आप बिना अनुमति के इस सामग्री का उपयोग नहीं कर सकते।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  उपयोगकर्ता सामग्री
                </h2>
                <p>
                  यदि आप हमारी वेबसाइट पर कोई सामग्री पोस्ट करते हैं, तो आप हमें उस सामग्री का उपयोग करने का अधिकार देते हैं। आप यह गारंटी देते हैं कि आपके पास ऐसा करने का अधिकार है।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  सेवा की उपलब्धता
                </h2>
                <p>
                  हम अपनी सेवा को 24/7 उपलब्ध रखने का प्रयास करते हैं, लेकिन हम इसकी गारंटी नहीं दे सकते। तकनीकी समस्याओं या रखरखाव के कारण सेवा अस्थायी रूप से बाधित हो सकती है।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  जिम्मेदारी की सीमा
                </h2>
                <p>
                  देश आज न्यूज़ किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक या परिणामी नुकसान के लिए जिम्मेदार नहीं होगा जो हमारी सेवा के उपयोग से उत्पन्न हो सकता है।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  सेवा में परिवर्तन
                </h2>
                <p>
                  हम बिना पूर्व सूचना के अपनी सेवा को बदलने या बंद करने का अधिकार सुरक्षित रखते हैं। हम इन शर्तों को भी समय-समय पर अपडेट कर सकते हैं।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  विवाद समाधान
                </h2>
                <p>
                  इन शर्तों से संबंधित किसी भी विवाद को भारतीय कानून के तहत हल किया जाएगा। सभी विवाद नई दिल्ली की अदालतों के अधिकार क्षेत्र में आएंगे।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  संपर्क जानकारी
                </h2>
                <p>
                  यदि आपके पास इन सेवा की शर्तों के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p><strong>ईमेल:</strong> legal@deshaaj.com</p>
                  <p><strong>पता:</strong> देश आज न्यूज़, नई दिल्ली, भारत</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


