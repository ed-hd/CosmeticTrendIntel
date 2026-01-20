
import React, { useState, useCallback } from 'react';
import { AnalysisStatus, TrendData } from './types';
import { fetchCosmeticTrends } from './services/geminiService';
import AnalysisDashboard from './components/AnalysisDashboard';
import { 
  Sparkles, 
  Search, 
  Loader2, 
  AlertCircle, 
  BarChart4, 
  Info
} from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [trendData, setTrendData] = useState<TrendData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartAnalysis = useCallback(async () => {
    setStatus(AnalysisStatus.LOADING);
    setError(null);
    try {
      const data = await fetchCosmeticTrends();
      setTrendData(data);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while analyzing trends.");
      setStatus(AnalysisStatus.ERROR);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100">
      {/* Navigation / Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              Cosmetic<span className="text-indigo-600 font-medium tracking-normal ml-1">TrendIntel</span>
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-4 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-indigo-600 transition-colors">Market</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Ingredients</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Consumer</a>
            </nav>
            <div className="h-6 w-px bg-slate-200"></div>
            <button 
              onClick={handleStartAnalysis}
              disabled={status === AnalysisStatus.LOADING}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              {status === AnalysisStatus.LOADING ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Search size={16} />
              )}
              {status === AnalysisStatus.IDLE ? 'Start Analysis' : 'Refresh Data'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {status === AnalysisStatus.IDLE && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mb-8 animate-pulse">
              <BarChart4 size={40} />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Global Beauty Market <br /> Intelligence Platform
            </h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              Generate real-time reports on cosmetics trends, ingredient shifts, and consumer dynamics powered by Gemini 3 and real-time Google search grounding.
            </p>
            <button 
              onClick={handleStartAnalysis}
              className="group relative inline-flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl hover:shadow-indigo-200 active:scale-[0.98]"
            >
              Run Global Trend Report
              <Search size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-12 flex gap-8 items-center text-slate-400 text-sm">
              <div className="flex items-center gap-1"><Info size={14} /> K-Beauty & J-Beauty</div>
              <div className="flex items-center gap-1"><Info size={14} /> Sustainability Trends</div>
              <div className="flex items-center gap-1"><Info size={14} /> Clinical Ingredients</div>
            </div>
          </div>
        )}

        {status === AnalysisStatus.LOADING && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles size={32} className="text-indigo-600 animate-pulse" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Global Data...</h3>
            <p className="text-slate-500 animate-pulse">Gathering insights from market reports and recent search data.</p>
          </div>
        )}

        {status === AnalysisStatus.ERROR && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-lg mx-auto bg-red-50 p-12 rounded-3xl border border-red-100">
            <AlertCircle size={64} className="text-red-500 mb-6" />
            <h3 className="text-2xl font-bold text-red-900 mb-4">Report Generation Failed</h3>
            <p className="text-red-600 mb-8">{error}</p>
            <button 
              onClick={handleStartAnalysis}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {status === AnalysisStatus.SUCCESS && trendData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Cosmetic Market Intelligence</h2>
                <p className="text-slate-500 mt-1">Real-time analysis based on data as of {new Date().toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => window.print()} 
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm no-print"
              >
                Download PDF Report
              </button>
            </div>
            <AnalysisDashboard data={trendData} />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 py-12 bg-white no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-white">
              <Sparkles size={12} />
            </div>
            <span className="font-bold text-slate-800">CosmeticTrendIntel</span>
          </div>
          <p className="text-slate-400 text-sm">
            &copy; 2024 Market Intelligence Hub. Powered by Google Gemini.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">API</a>
          </div>
        </div>
      </footer>

      {/* Persistent Call to Action for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button 
          onClick={handleStartAnalysis}
          className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
        >
          <Search size={24} />
        </button>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; padding: 0; }
          main { width: 100%; max-width: 100%; padding: 0; }
          .rounded-2xl { border-radius: 0; border: none; box-shadow: none; }
          .shadow-sm, .shadow-xl { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
