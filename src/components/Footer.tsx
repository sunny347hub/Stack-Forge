import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-dark-border bg-dark-surface/50 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forge-600 flex items-center justify-center text-white">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 19L12 22L20 19" />
                  <path d="M4 14L12 17L20 14" />
                  <path d="M4 9L12 12L20 9L12 4L4 9Z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Stack<span className="text-forge-500">Forge</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Build your skills. Forge your future. The structured, hands-on learning platform for modern full-stack web developers.
            </p>
          </div>

          {/* Curriculum */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Curriculum</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/courses/html-fundamentals" className="hover:text-forge-400 transition-colors">HTML Fundamentals</Link></li>
              <li><Link to="/courses/css-fundamentals" className="hover:text-forge-400 transition-colors">CSS & Modern Layouts</Link></li>
              <li><Link to="/courses/javascript-fundamentals" className="hover:text-forge-400 transition-colors">JavaScript ES6+</Link></li>
              <li><Link to="/courses/react-fundamentals" className="hover:text-forge-400 transition-colors">React & Component Architecture</Link></li>
              <li><Link to="/courses/sql-fundamentals" className="hover:text-forge-400 transition-colors">Relational SQL & Databases</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/learn" className="hover:text-forge-400 transition-colors">Course Catalog</Link></li>
              <li><Link to="/learning-paths" className="hover:text-forge-400 transition-colors">Full-Stack Developer Path</Link></li>
              <li><span className="text-slate-500 cursor-not-allowed">Practice Problems (V2)</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Guided Projects (V2)</span></li>
            </ul>
          </div>

          {/* Architecture & Security */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Architecture</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built with Supabase PostgreSQL, Row Level Security, isolated WebAssembly SQL, and sandboxed code execution.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational</span>
            </div>
          </div>

        </div>

        <div className="border-t border-dark-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StackForge. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for developers, built for mastery.</p>
        </div>
      </div>
    </footer>
  );
};
