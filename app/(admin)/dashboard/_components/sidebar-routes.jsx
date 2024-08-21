"use client";
import { SidebarItem } from "./sidebar-item";
import { BarChart, Users } from 'lucide-react';
import { BookOpen } from 'lucide-react';

const adminRoutes = [
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/admin/dashboard'
  },
  {
    icon: BookOpen,
    label: 'Courses',
    href: '/admin/courses'
  },
  {
    icon: Users,
    label: 'Instructors',
    href: '/admin/instructors'
  },
]


export const SidebarRoutes = () => {

  return (
    <div className="flex flex-col w-full">
      {
        adminRoutes?.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))
      }
    </div>
  );
};
