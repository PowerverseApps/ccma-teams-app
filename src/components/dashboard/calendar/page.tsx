import { useState } from 'react';
import MenuLayout from '../../layout/MenuLayout';
//import Calendar from './components/Calendar';
import  TeamsLikeCalendar  from './components/Calendar';

export default function Support() {
  return (
    <MenuLayout>
      
      <TeamsLikeCalendar/>
    </MenuLayout>
  );
}