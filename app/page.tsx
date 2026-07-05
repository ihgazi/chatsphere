import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen font-sans justify-center items-center overflow-hidden bg-slate-50">
      
      {/* Dynamic Background Soft Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-cyan-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Subtle Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        
        {/* Badge */}
        <div className="mb-6 px-5 py-2 rounded-full border border-blue-200 bg-blue-50 shadow-sm transform transition-transform hover:scale-105 cursor-default">
            <span className="text-sm font-semibold tracking-wide text-blue-700 uppercase">Welcome to the future of communication</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm mb-6 pb-2">
          Chat<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Sphere</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
          Experience real-time, global communication with unmatched speed and beautiful design. Jump into a room and start collaborating instantly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link href="/register" className="px-10 py-4 bg-blue-600 text-white font-bold rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg flex items-center justify-center shadow-md">
            Get Started Free
          </Link>
          
          <Link href="/login" className="px-10 py-4 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl text-lg transition-all duration-300 hover:bg-slate-50 hover:border-slate-400 hover:scale-105 hover:shadow-md flex items-center justify-center shadow-sm">
            Sign In to Account
          </Link>
        </div>

      </div>
    </main>
  );
}
