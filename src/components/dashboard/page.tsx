import React from 'react';
import MenuLayout from '../layout/MenuLayout';
import { Button } from '../ui/button';
import { CalendarDateRangePicker } from '../ui/date-range-picker';
import AttendeeList from './components/attendees';
import Meetings from './components/meetings';
import SectionCards from './components/section-cards';

export default function Dashboard() {
  return (
    <MenuLayout>
      <div className="flex h-16 items-center px-4">
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="ml-auto flex items-center space-x-2 mt-2">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="">
            <SectionCards />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Meetings />
            <AttendeeList />
          </div>
        </div>
      </div>
    </MenuLayout>
  );
}