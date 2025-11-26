import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import Auth
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Moon, 
  Sun,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  MoreHorizontal,
  LogOut // Added Logout Icon
} from 'lucide-react';

// --- Reusable Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-md ${className}`}>
    {children}
  </div>
);

const IconButton = ({ icon: Icon, onClick, className = "", badge = false }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors relative ${className}`}
  >
    <Icon size={20} />
    {badge && (
      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800"></span>
    )}
  </button>
);

const StatCard = ({ title, value, change, isPositive, icon: Icon, delay }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />;

  return (
    <Card className="p-6 flex items-start justify-between group cursor-default">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</h3>
        <div className={`flex items-center mt-2 text-xs font-semibold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
          {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
          <span>{change}</span>
          <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">vs last month</span>
        </div>
      </div>
      <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg group-hover:scale-110 transition-transform duration-300">
        <Icon size={22} />
      </div>
    </Card>
  );
};

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
      ${active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
      }`}
  >
    <Icon size={20} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

// --- MAIN DASHBOARD PAGE ---

const DashboardPage = () => {
  // Connect to Real Auth Logic
  const { user, logout } = useAuth(); 

  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const stats = [
    { title: 'Total Revenue', value: '$84,294', change: '+12.5%', isPositive: true, icon: DollarSign },
    { title: 'Active Users', value: '12,450', change: '+8.2%', isPositive: true, icon: Users },
    { title: 'Bounce Rate', value: '42.3%', change: '-2.4%', isPositive: true, icon: Activity },
    { title: 'New Leads', value: '2,845', change: '-1.1%', isPositive: false, icon: LayoutDashboard },
  ];

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Nawin<span className="text-indigo-600">UI</span></span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="ml-auto lg:hidden text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Analytics</p>
            {['Dashboard', 'Team', 'Projects', 'Reports'].map((item) => (
              <SidebarItem 
                key={item} 
                icon={item === 'Dashboard' ? LayoutDashboard : item === 'Team' ? Users : Activity}
                label={item} 
                active={activeTab === item}
                onClick={() => {
                  setActiveTab(item);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
              />
            ))}
            
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-8 mb-4">System</p>
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
            
            {/* Added Log Out Button */}
            <SidebarItem icon={LogOut} label="Sign Out" onClick={logout} />
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-700">
             <div className="flex items-center space-x-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-8 h-8 rounded-full bg-slate-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email || 'Pro Plan'}</p>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen transition-all duration-300">
        <header className="h-16 sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="mr-4 lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center max-w-md w-full relative group">
              <Search size={18} className="absolute left-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input type="text" placeholder="Search analytics..." className="pl-10 pr-4 py-2 w-64 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 transition-all focus:w-80 dark:text-white" />
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <IconButton icon={darkMode ? Sun : Moon} onClick={() => setDarkMode(!darkMode)} />
            <IconButton icon={Bell} onClick={() => {}} badge={true} />
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
           {/* ... Rest of your Dashboard Content (Grid, Charts) ... */}
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, here's what's happening today.</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Export
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95">
                + New Report
              </button>
            </div>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading 
              ? Array(4).fill(0).map((_, i) => <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />)
              : stats.map((stat, i) => (
                  <StatCard key={i} {...stat} delay={i * 100} />
                ))
            }
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart Area */}
            <Card className="lg:col-span-2 p-6 min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 dark:text-white">Revenue Analytics</h3>
                <IconButton icon={MoreHorizontal} />
              </div>
              
              {isLoading ? (
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              ) : (
                <div className="flex-1 flex items-end space-x-2 sm:space-x-6 justify-between px-2 pb-4">
                   {/* CSS Bar Chart Simulation */}
                   {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                     <div key={i} className="flex-1 flex flex-col justify-end group">
                       <div 
                         className="w-full bg-indigo-100 dark:bg-indigo-900/30 rounded-t-sm relative overflow-hidden transition-all duration-500 hover:opacity-80"
                         style={{ height: `${h}%` }}
                       >
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-indigo-500 transition-all duration-1000 ease-out" 
                            style={{ height: '0%', animation: `growUp 1s ease-out forwards ${i * 0.1}s` }} 
                          />
                       </div>
                       <span className="text-xs text-center text-slate-400 mt-2">Mon</span>
                     </div>
                   ))}
                   <style>{`
                     @keyframes growUp { to { height: 100%; } }
                   `}</style>
                </div>
              )}
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {isLoading ? (
                   Array(5).fill(0).map((_, i) => (
                     <div key={i} className="flex space-x-3">
                       <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                       <div className="flex-1 h-8 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                     </div>
                   ))
                ) : (
                  [
                    { user: 'Sarah W.', action: 'Created a new project', time: '2 mins ago', color: 'bg-emerald-500' },
                    { user: 'James L.', action: 'Completed task #402', time: '1 hour ago', color: 'bg-blue-500' },
                    { user: 'Mina K.', action: 'Uploaded new assets', time: '3 hours ago', color: 'bg-purple-500' },
                    { user: 'System', action: 'Automated backup done', time: '5 hours ago', color: 'bg-slate-500' },
                    { user: 'Alex D.', action: 'Updated team settings', time: '1 day ago', color: 'bg-rose-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-3 group">
                      <div className={`w-2 h-2 mt-2 rounded-full ${item.color} ring-4 ring-slate-50 dark:ring-slate-900`} />
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          <span className="font-medium text-slate-900 dark:text-white hover:underline cursor-pointer">{item.user}</span> {item.action}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button className="w-full mt-6 py-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                View All History
              </button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
