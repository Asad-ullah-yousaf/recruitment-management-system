'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  LogOut, 
  User as UserIcon,
  Building2,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMobileOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus trap - focus first focusable element
      const firstFocusable = sidebarRef.current?.querySelector('a, button') as HTMLElement;
      firstFocusable?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  interface NavItem {
    href: string;
    label: string;
    icon: any;
    ariaLabel: string;
  }

  const navItems: NavItem[] = [];

  if (user.role === 'super_admin') {
    navItems.push(
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, ariaLabel: 'Navigate to Dashboard' },
      { href: '/departments', label: 'Departments', icon: Building2, ariaLabel: 'Navigate to Departments' },
      { href: '/interviews', label: 'Interviews', icon: Calendar, ariaLabel: 'Navigate to Interviews' },
    );
  } else if (user.role === 'department_hr') {
    navItems.push(
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, ariaLabel: 'Navigate to Dashboard' },
      { href: `/departments/${user.departmentId}`, label: 'My Department', icon: Building2, ariaLabel: 'Navigate to My Department' },
      { href: '/interviews', label: 'Interviews', icon: Calendar, ariaLabel: 'Navigate to Interviews' },
    );
  } else if (user.role === 'candidate') {
    navItems.push(
      { href: '/jobs', label: 'Browse Jobs', icon: Briefcase, ariaLabel: 'Navigate to Browse Jobs' },
      { href: '/applications', label: 'My Applications', icon: UserIcon, ariaLabel: 'Navigate to My Applications' },
    );
  }

  const getRoleBadgeVariant = () => {
    if (user.role === 'super_admin') return 'default';
    if (user.role === 'department_hr') return 'secondary';
    return 'outline';
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4 border-b">
        <Link 
          href="/dashboard" 
          className="text-2xl font-bold text-primary flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          aria-label="RMS Home"
        >
          RMS
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <nav 
        className="flex-1 p-4 space-y-2"
        aria-label="Main navigation"
        role="navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
              aria-label={item.ariaLabel}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t space-y-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground" aria-label={`Logged in as ${user.name}`}>
              {user.name}
            </span>
            <Badge variant={getRoleBadgeVariant()} className="mt-1 w-fit" aria-label={`Role: ${user.role}`}>
              {user.role === 'super_admin' ? 'Super Admin' : 
               user.role === 'department_hr' ? 'Dept HR' : 'Candidate'}
            </Badge>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start"
          size="sm"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          ref={menuButtonRef}
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-background"
          aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileOpen}
          aria-controls="sidebar-navigation"
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="sidebar-navigation"
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-card border-r z-40 flex flex-col transition-transform duration-300",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Sidebar navigation"
        role="complementary"
      >
        <SidebarContent />
      </aside>
    </>
  );
}
