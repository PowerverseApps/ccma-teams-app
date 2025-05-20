import MenuLayout from '../../layout/MenuLayout';
//import ActionCard from './components/ActionCard';
import { useState } from 'react';
//import Modal from './components/Modal';
import ActionsPage from './components/ActionsPage';

export default function Actions() {
  return (
    <MenuLayout>
      {/* Add your content here */}
      <ActionsPage/>
    </MenuLayout>
  );
}