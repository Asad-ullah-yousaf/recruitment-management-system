'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Calendar, 
  LogOut, 
  User as UserIcon,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const isActive = (path: string) => pathname === path;

  const navItems = [];

  if (user.role === 'super_admin') {
    navItems.push(
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/departments', label: 'Departments', icon: Building2 },
      { href: '/interviews', label: 'Interviews', icon: Calendar },
    );
  } else if (user.role === 'department_hr') {
    navItems.push(
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: `/departments/${user.departmentId}`, label: 'My Department', icon: Building2 },
      { href: '/interviews', label: 'Interviews', icon: Calendar },
    );
  } else if (user.role === 'candidate') {
    navItems.push(
      { href: '/jobs', label: 'Browse Jobs', icon: Briefcase },
      { href: '/applications', label: 'My Applications', icon: UserIcon },
    );
  }

  const getRoleBadgeVariant = () => {
    if (user.role === 'super_admin') return 'default';
    if (user.role === 'department_hr') return 'secondary';
    return 'outline';
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                RMS
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? 'border-primary text-foreground'
                        : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">{user.name}</span>
            <Badge variant={getRoleBadgeVariant()}>
              {user.role === 'super_admin' ? 'Super Admin' : 
               user.role === 'department_hr' ? 'Dept HR' : 'Candidate'}
            </Badge>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

