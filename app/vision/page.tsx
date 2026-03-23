import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAccessGuard from '@/components/AIAccessGuard';
import AIVisionStudio from '@/components/AIVisionStudio';

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar />
      <div className="flex-grow pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4 text-zinc-900">
              AI Design <span className="text-zinc-500">Studio</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl">
              Leverage the power of advanced AI to ideate, visualize, and animate architectural concepts before breaking ground.
            </p>
          </div>
          
          <AIAccessGuard>
            <AIVisionStudio />
          </AIAccessGuard>
        </div>
      </div>
      <Footer />
    </main>
  );
}
