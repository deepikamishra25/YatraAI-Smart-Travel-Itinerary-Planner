export default function BackgroundDecorations() {
  // We use different animation delays and duration overrides to make the floating organic
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Base Background Colors */}
      {/* Light Mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-orange-50/30 dark:hidden"></div>
      
      {/* Dark Mode */}
      <div className="absolute inset-0 bg-slate-950 hidden dark:block"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,53,0.1),transparent_50%)] hidden dark:block"></div>
      
      {/* Grid Pattern (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-40 dark:hidden"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(180deg,white,rgba(0,0,0,0))] opacity-20 hidden dark:block"></div>

      {/* Large Blurred Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-orange-300/20 blur-[100px] dark:bg-orange-900/20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-300/20 blur-[100px] dark:bg-blue-900/20"></div>
      <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-emerald-300/10 blur-[100px] dark:bg-emerald-900/10"></div>

      {/* Floating Glass Boxes */}
      {/* Top Left Area */}
      <div className="absolute top-[15%] left-[10%] w-16 h-16 glass-box animate-float rotate-12" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
      <div className="absolute top-[25%] left-[5%] w-10 h-10 glass-box animate-float -rotate-6" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
      
      {/* Top Right Area */}
      <div className="absolute top-[20%] right-[15%] w-20 h-20 glass-box animate-float rotate-45" style={{ animationDelay: '1.5s', animationDuration: '9s' }}></div>
      <div className="absolute top-[10%] right-[25%] w-12 h-12 glass-box animate-float -rotate-12" style={{ animationDelay: '3.5s', animationDuration: '7s' }}></div>
      
      {/* Middle Area */}
      <div className="absolute top-[50%] left-[20%] w-14 h-14 glass-box animate-float rotate-12" style={{ animationDelay: '1s', animationDuration: '8.5s' }}></div>
      <div className="absolute top-[60%] right-[10%] w-24 h-24 glass-box animate-float -rotate-45" style={{ animationDelay: '4s', animationDuration: '11s' }}></div>
      <div className="absolute top-[45%] right-[30%] w-10 h-10 glass-box animate-float rotate-6" style={{ animationDelay: '2.5s', animationDuration: '6s' }}></div>

      {/* Bottom Area */}
      <div className="absolute bottom-[20%] left-[15%] w-20 h-20 glass-box animate-float rotate-45" style={{ animationDelay: '0.5s', animationDuration: '9.5s' }}></div>
      <div className="absolute bottom-[10%] left-[30%] w-12 h-12 glass-box animate-float -rotate-12" style={{ animationDelay: '3s', animationDuration: '7.5s' }}></div>
      <div className="absolute bottom-[15%] right-[20%] w-16 h-16 glass-box animate-float rotate-12" style={{ animationDelay: '1.2s', animationDuration: '8.2s' }}></div>
    </div>
  );
}
