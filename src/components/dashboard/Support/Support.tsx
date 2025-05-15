import React from 'react';
import MenuLayout from '../../layout/MenuLayout';
import CallCentre from './components/call-center';
import SupportChat from './components/support-chat';

export default function Support() {
  return (
    <MenuLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CallCentre />
        <SupportChat />
      </div>
    </MenuLayout>
  );
}