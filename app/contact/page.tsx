import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4" style={{ fontFamily: 'var(--font-roboto-slab)' }}>
          संपर्क करें
        </h1>
        <p className="text-gray-700 mb-6" style={{ fontFamily: 'var(--font-open-sans)' }}>
          किसी भी सुझाव या प्रश्न के लिए हमें ईमेल करें: contact@yourdomain.com
        </p>
      </main>
      <Footer />
    </div>
  );
}
