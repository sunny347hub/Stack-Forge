import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowRight, 
  Code, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Flame, 
  Compass
} from 'lucide-react';

export const Home: React.FC = () => {
  const { user } = useAuth();

  const journeySteps = [
    { title: 'HTML', category: 'Markup' },
    { title: 'CSS', category: 'Styling' },
    { title: 'JavaScript', category: 'Logic' },
    { title: 'Git', category: 'VCS' },
    { title: 'npm', category: 'Packages' },
    { title: 'TypeScript', category: 'Types' },
    { title: 'React', category: 'UI' },
    { title: 'Node.js', category: 'Runtime' },
    { title: 'Express.js', category: 'APIs' },
    { title: 'SQL', category: 'Queries' },
    { title: 'PostgreSQL', category: 'RDBMS' },
    { title: 'MySQL', category: 'Database' },
  ];

  const features = [
    {
      icon: <Layers className="w-6 h-6 text-forge-400" />,
      title: 'Structured Curriculum',
      description: 'Step-by-step modules designed from absolute fundamentals to production web architecture.'
    },
    {
      icon: <Code className="w-6 h-6 text-sky-400" />,
      title: 'Hands-on Coding Workspace',
      description: 'Write, execute, and inspect your code directly in your browser with real sandboxed runtime feedback.'
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
      title: 'Secure Knowledge Checks',
      description: 'Test your understanding with server-evaluated quizzes, detailed explanations, and attempt history.'
    },
    {
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      title: 'Persistent Learning Progress',
      description: 'Never lose your place. Course progress, code drafts, and daily streaks automatically sync to your profile.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-dark-border">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-forge-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forge-500/10 border border-forge-500/25 text-forge-400 text-xs font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-forge-500" />
                <span>Modern Full-Stack Developer Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Build Your Skills. <br />
                <span className="bg-gradient-to-r from-forge-400 via-forge-500 to-amber-300 bg-clip-text text-transparent">
                  Forge Your Future.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Learn web development step by step with structured courses, practical coding exercises, and a guided 12-stage learning path designed to help you become a confident software engineer.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to={user ? "/learn" : "/signup"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-forge-600 to-forge-500 hover:from-forge-500 hover:to-forge-400 shadow-xl shadow-forge-500/25 transition-all text-base group"
                >
                  <span>{user ? "Continue Learning" : "Start Learning Free"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/learn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-dark-card hover:bg-slate-800 border border-dark-border hover:border-slate-600 transition-all text-base"
                >
                  <Compass className="w-4 h-4 text-slate-400" />
                  <span>Explore Courses</span>
                </Link>
              </div>

              {/* Key Trust Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-dark-border/60 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-xs text-slate-400 font-medium">Curated Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-slate-400 font-medium">Browser Execution</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-xs text-slate-400 font-medium">Core Curriculum</div>
                </div>
              </div>
            </div>

            {/* Hero Right Code Card Mockup */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-dark-surface border border-dark-border shadow-2xl overflow-hidden p-1">
                {/* Window Top Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-dark-card/90 border-b border-dark-border/80">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-xs font-mono text-slate-400 font-medium">
                    stackforge-workspace.js
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-forge-500/15 border border-forge-500/30 text-forge-400 text-[10px] font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-forge-500 animate-ping" />
                    LIVE PREVIEW
                  </div>
                </div>

                {/* Code Window Body */}
                <div className="p-4 font-mono text-xs leading-relaxed text-slate-300 bg-dark-bg/90 overflow-x-auto">
                  <div className="text-slate-500">// Initialize StackForge developer journey</div>
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-sky-300">developer</span> = {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-300">goal:</span>{' '}
                    <span className="text-emerald-300">"Master Full-Stack Engineering"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-300">skills:</span> [
                    <span className="text-amber-300">"HTML"</span>,{' '}
                    <span className="text-amber-300">"CSS"</span>,{' '}
                    <span className="text-amber-300">"JavaScript"</span>,{' '}
                    <span className="text-amber-300">"React"</span>,{' '}
                    <span className="text-amber-300">"SQL"</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-300">workspace:</span>{' '}
                    <span className="text-sky-400">"Monaco + Live Execution"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-300">streakReady:</span>{' '}
                    <span className="text-forge-400">true</span>
                  </div>
                  <div>{'};'}</div>
                  <br />
                  <div>
                    <span className="text-purple-400">async function</span>{' '}
                    <span className="text-blue-400">forgeCareer</span>() {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">await</span>{' '}
                    <span className="text-blue-400">completeLesson</span>(<span className="text-emerald-300">"html-fundamentals"</span>);
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">console</span>.<span className="text-blue-300">log</span>(
                    <span className="text-emerald-300">"Ready to build the web!"</span>
                  );
                  </div>
                  <div>{'}'}</div>
                </div>

                {/* Simulated Output Panel */}
                <div className="p-3 bg-dark-card border-t border-dark-border text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Compiled successfully in 42ms</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">Output: 0 errors</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Learning Journey Preview Pipeline */}
      <section className="py-16 bg-dark-surface/40 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs uppercase tracking-widest font-bold text-forge-400 mb-2">
              Guided 12-Stage Roadmap
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Complete Full-Stack Learning Path
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              From your very first HTML tag to relational SQL schemas and backend Express REST APIs.
            </p>
          </div>

          {/* Interactive Pipeline Carousel/Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {journeySteps.map((step, index) => (
              <div
                key={step.title}
                className="relative group p-4 rounded-xl bg-dark-card border border-dark-border hover:border-forge-500/50 hover:bg-slate-800/60 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-semibold text-slate-500 group-hover:text-forge-400 transition-colors">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:text-slate-300">
                    {step.category}
                  </span>
                </div>
                <div className="text-sm font-bold text-white group-hover:text-forge-300 transition-colors">
                  {step.title}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/learning-paths"
              className="inline-flex items-center gap-2 text-sm font-semibold text-forge-400 hover:text-forge-300 transition-colors"
            >
              <span>Explore the complete 12-stage curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs uppercase tracking-widest font-bold text-forge-400 mb-2">
            Why StackForge Works
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Designed for Practical Developer Mastery
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            We combined structured curriculum, instant isolated execution, and progress tracking so you spend your time coding, not configuring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-slate-600 transition-all flex flex-col space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                {f.icon}
              </div>
              <h4 className="text-base font-bold text-white pt-1">{f.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ready to Learn CTA */}
      <section className="py-16 border-t border-dark-border bg-gradient-to-b from-dark-surface/50 to-dark-bg">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Begin Your Full-Stack Journey?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Join StackForge today and build real web skills lesson by lesson. Completely free to start.
          </p>
          <div>
            <Link
              to={user ? "/learn" : "/signup"}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-forge-600 to-forge-500 hover:from-forge-500 hover:to-forge-400 shadow-xl shadow-forge-500/25 transition-all text-base"
            >
              <span>{user ? "Go to My Dashboard" : "Create Free Account"}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
