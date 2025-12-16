import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: string;
}

const colorMap: Record<string, string> = {
  blue: 'bg-primary/10 text-primary',
  green: 'bg-success/10 text-success',
  purple: 'bg-purple-500/10 text-purple-600',
  indigo: 'bg-primary/10 text-primary',
  orange: 'bg-warning/10 text-warning',
};

export default function StatCard({ title, value, icon: Icon, color = 'blue', trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
            {trend && (
              <p className="text-sm text-muted-foreground mt-1">{trend}</p>
            )}
          </div>
          <div className={cn("p-3 rounded-full", colorMap[color] || colorMap.blue)}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

