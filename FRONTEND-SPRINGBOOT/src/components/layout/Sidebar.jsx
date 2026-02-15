import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import {
    Home,
    UserPlus,
    FileText,
    Bell,
    Users,
    Settings,
    Building2,
    CreditCard,
    ShieldCheck,
    Calendar,
    LogOut,
    Briefcase,
    HelpCircle,
    ShoppingBag
} from 'lucide-react';

export default function Sidebar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navigation = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: Home,
            show: !user?.roles?.includes('ROLE_SECURITY_GUARD')
        },
        {
            name: 'Manage Users',
            href: '/dashboard/users',
            icon: Settings,
            show: user?.roles?.some(r => ['ROLE_ADMIN', 'ROLE_RWA_PRESIDENT', 'ROLE_RWA_SECRETARY'].includes(r))
        },
        {
            name: 'Membership',
            href: '/dashboard/membership',
            icon: UserPlus,
            show: user?.roles?.some(r => ['ROLE_ADMIN', 'ROLE_RWA_SECRETARY', 'ROLE_RWA_PRESIDENT'].includes(r))
        },
        {
            name: 'Complaints',
            href: '/dashboard/complaints',
            icon: FileText,
            show: !user?.roles?.includes('ROLE_SUPER_ADMIN') && !user?.roles?.includes('ROLE_SECURITY_GUARD')
        },
        {
            name: 'Notices',
            href: '/dashboard/notices',
            icon: Bell,
            show: !user?.roles?.includes('ROLE_SUPER_ADMIN') && !user?.roles?.includes('ROLE_SECURITY_GUARD')
        },
        {
            name: 'Maintenance',
            href: '/dashboard/maintenance',
            icon: CreditCard,
            show: user?.roles?.some(r => ['ROLE_ADMIN', 'ROLE_RESIDENT', 'ROLE_RWA_SECRETARY'].includes(r))
        },
        {
            name: 'Amenities',
            href: '/dashboard/amenities',
            icon: Calendar,
            show: user?.roles?.some(r => ['ROLE_ADMIN', 'ROLE_RWA_SECRETARY', 'ROLE_RESIDENT'].includes(r))
        },
        {
            name: 'Marketplace',
            href: '/dashboard/marketplace',
            icon: ShoppingBag,
            show: !user?.roles?.includes('ROLE_SUPER_ADMIN') && !user?.roles?.includes('ROLE_SECURITY_GUARD')
        },
        {
            name: 'Visitors',
            href: '/dashboard/visitors',
            icon: Users,
            show: user?.roles?.some(r => ['ROLE_SECURITY_GUARD', 'ROLE_ADMIN', 'ROLE_RWA_PRESIDENT', 'ROLE_RWA_SECRETARY'].includes(r))
        },
        {
            name: 'Staff Management',
            href: '/dashboard/staff',
            icon: Briefcase,
            show: !user?.roles?.includes('ROLE_SUPER_ADMIN')
        },
        {
            name: 'My Visitors',
            href: '/dashboard/my-visitors',
            icon: ShieldCheck,
            show: user?.roles?.includes('ROLE_RESIDENT')
        },
        {
            name: 'Manage Societies',
            href: '/dashboard/society-setup',
            icon: Building2,
            show: user?.roles?.includes('ROLE_SUPER_ADMIN')
        },
        {
            name: 'Guard Registration',
            href: '/dashboard/register-guard',
            icon: UserPlus,
            show: user?.roles?.some(r => ['ROLE_ADMIN', 'ROLE_RWA_SECRETARY'].includes(r))
        },
    ];

    return (
        <div className="hidden lg:flex flex-col w-72 bg-gray-900 border-r border-gray-700 h-screen sticky top-0">
            <div className="flex flex-col h-full">
                {/* Brand */}
                <div className="px-6 flex items-center h-24">
                    <div className="bg-blue-600 p-2 rounded-lg mr-3">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">
                        ECanopy
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navigation.filter(item => item.show).map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg',
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 mx-4 mb-6 rounded-lg bg-gray-800 border border-gray-700">
                    <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
                            {user?.fullName?.charAt(0) || 'U'}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-bold text-white">{user?.fullName}</p>
                            <p className="text-xs text-blue-400">
                                {user?.roles?.[0]?.replace('ROLE_', '') || 'User'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
