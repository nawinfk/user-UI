import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
// Import the new DashboardPage we just created
import DashboardPage from './pages/DashboardPage'; 

// The "Guard" Component
const AppContent = () => {
  const { user, loading } = useAuth();

  // 1. Show a loader while we check LocalStorage (prevents flashing Login screen)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // 2. Logic: User exists? Show Dashboard. No user? Show Login.
  return user ? <DashboardPage /> : <LoginPage />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
