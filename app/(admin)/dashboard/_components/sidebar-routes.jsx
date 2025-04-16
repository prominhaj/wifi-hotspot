"use client";
import { SidebarItem } from "./sidebar-item";
import { BadgeDollarSign, BarChart, Cog, MonitorSmartphone, Package, Users, Wifi } from 'lucide-react';

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
    icon: Package,
    label: 'Packages',
    href: '/dashboard/packages'
  },
  {
    icon: Users,
    label: 'Users',
    href: '/dashboard/users'
  },
  {
    icon: MonitorSmartphone,
    label: 'Mac Addresses',
    href: '/dashboard/mac-addresses'
  },
  {
    icon: BadgeDollarSign,
    label: 'Payment History',
    href: '/dashboard/payment/history'
  },
  {
    icon: Cog,
    label: 'Configuration',
    href: '/dashboard/config'
  },
]

export const SidebarRoutes = ({ setIsOpen }) => {

  return (
    <div className="flex flex-col w-full">
      {
        adminRoutes?.map((route) => (
          <SidebarItem
            setIsOpen={setIsOpen}
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
