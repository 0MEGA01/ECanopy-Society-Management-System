import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, Menu, Command, Sparkles } from 'lucide-react';

export default function TopBar() {
    const location = useLocation();
    const { user } = useAuth();

    const getHeading = () => {
        const path = location.pathname.split('/').pop() || 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
    };

    return (
        <header className="h-24 px-10 flex items-center justify-between sticky top-0 z-40 bg-white border-b border-gray-200">
            <div className="flex items-center gap-8">
                <button className="lg:hidden p-3 text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Menu className="w-5 h-5" />
                </button>

                <div className="hidden lg:flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xs text-gray-500 uppercase mb-1">Current Page</h2>
                        <h1 className="text-2xl font-bold text-gray-900">{getHeading()}</h1>
                    </div>
                </div>

            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <button className="p-3 text-gray-600 hover:text-blue-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 h-2 w-2 bg-blue-600 rounded-full"></span>
                    </button>

                    <button className="p-3 text-gray-400 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Command className="w-5 h-5" />
                    </button>
                </div>

                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-200">
                    <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
                        {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <p className="text-sm font-bold text-gray-900">{user?.fullName}</p>
                        <p className="text-xs text-blue-600">
                            {user?.roles?.[0]?.replace('ROLE_', '') || 'User'}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
