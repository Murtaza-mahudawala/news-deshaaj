import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            हमारे बारे में
          </h1>
          
          <div className="prose max-w-none">
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  देश आज न्यूज़ के बारे में
                </h2>
                <p>
                  देश आज न्यूज़ भारत का एक प्रमुख हिंदी समाचार पोर्टल है जो देश और दुनिया की ताजा खबरों को अपने पाठकों तक पहुंचाता है। हमारा मिशन है सटीक, निष्पक्ष और समय पर समाचार प्रदान करना।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  हमारा मिशन
                </h2>
                <p>
                  हमारा मिशन है कि हम अपने पाठकों को सबसे ताजा, सटीक और विश्वसनीय समाचार प्रदान करें। हम मानते हैं कि सूचित नागरिक ही एक मजबूत लोकतंत्र का आधार होते हैं।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  हमारे मूल्य
                </h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>सत्यता:</strong> हम हमेशा सत्य और तथ्यों पर आधारित समाचार प्रकाशित करते हैं</li>
                  <li><strong>निष्पक्षता:</strong> हम किसी भी राजनीतिक या वाणिज्यिक दबाव से मुक्त रहकर निष्पक्ष पत्रकारिता करते हैं</li>
                  <li><strong>पारदर्शिता:</strong> हम अपने काम में पूर्ण पारदर्शिता बनाए रखते हैं</li>
                  <li><strong>जवाबदेही:</strong> हम अपने पाठकों के प्रति जवाबदेह हैं</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  हमारी सेवाएं
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">समाचार कवरेज</h3>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>राष्ट्रीय समाचार</li>
                      <li>अंतर्राष्ट्रीय समाचार</li>
                      <li>व्यापार और अर्थव्यवस्था</li>
                      <li>खेल समाचार</li>
                      <li>मनोरंजन</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">विशेष सुविधाएं</h3>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>ताजा खबरें</li>
                      <li>विशेष रिपोर्ट</li>
                      <li>विश्लेषण और राय</li>
                      <li>मल्टीमीडिया कंटेंट</li>
                      <li>मोबाइल अनुकूलित</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  हमारी टीम
                </h2>
                <p>
                  हमारी टीम में अनुभवी पत्रकार, संपादक और तकनीकी विशेषज्ञ शामिल हैं जो दिन-रात काम करके आपको सबसे बेहतरीन समाचार सेवा प्रदान करते हैं।
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  संपर्क करें
                </h2>
                <p>
                  यदि आपके पास कोई सुझाव, प्रश्न या फीडबैक है, तो हमसे संपर्क करने में संकोच न करें। हम आपकी आवाज़ सुनना चाहते हैं।
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p><strong>ईमेल:</strong> info@deshaaj.com</p>
                  <p><strong>फोन:</strong> +91-XXXXXXXXXX</p>
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


