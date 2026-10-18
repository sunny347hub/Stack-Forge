import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center text-forge-400 text-2xl font-bold">
        404
      </div>
      <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-sm">
        The learning module or page you are looking for does not exist or has been moved.
      </p>
      <div>
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-forge-600 hover:bg-forge-500 transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Go to Learn Dashboard</span>
        </Link>
      </div>
    </div>
  );
};
