"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { useState } from "react";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="pr-4 transition lg:hidden hover:opacity-75 bellotest">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-background/50">
        <Sidebar setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
};
