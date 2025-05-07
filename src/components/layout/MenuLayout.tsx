import React from 'react';
import { MainNav } from '../dashboard/components/main-nav';
import { Separator } from '../ui/separator';

interface MenuLayoutProps {
  children: React.ReactNode;
}

export default function MenuLayout({ children }: MenuLayoutProps) {
  return (
    <>
      <div className="flex h-16 items-center px-4">
        {/* <TeamSwitcher /> */}
        <MainNav className="mx-6" />
      </div>
      <Separator className="mt-2" />
      <div>{children}</div>
    </>
  );
}
