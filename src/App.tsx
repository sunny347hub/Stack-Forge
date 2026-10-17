import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { LearnDashboard } from './pages/LearnDashboard';
import { CourseDetail } from './pages/CourseDetail';
import { LessonWorkspace } from './pages/LessonWorkspace';
import { LearningPaths } from './pages/LearningPaths';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

const AppLayout: React.FC = () => {
  const location = useLocation();
  // Hide footer on full-screen IDE workspace
  const isWorkspace = location.pathname.startsWith('/learn/') && location.pathname.split('/').length > 2;

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-forge-500 selection:text-white">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/learn" element={<LearnDashboard />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/learn/:courseSlug/:lessonSlug" element={<LessonWorkspace />} />
          <Route path="/learning-paths" element={<LearningPaths />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isWorkspace && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
