"use client";
import { SidebarItem } from "./sidebar-item";
import { BarChart, Users, Wifi } from 'lucide-react';

const adminRoutes = [
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/dashboard'
  },
  {
    icon: Wifi,
    label: 'Hotspot Users',
    href: '/dashboard/hotspot-users'
  },
  {
    icon: Users,
    label: 'Users',
    href: '/dashboard/users'
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
