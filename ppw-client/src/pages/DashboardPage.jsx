import React from 'react';
import Navbar from '../features/navbar/Navbar';
import Dashboars from '../features/dashboard/Dashboars';
import Dashboard from '../features/dashboard/Dashboars';

export default function DashboardPage() {
  return (
    <Navbar>
      <Dashboard />
    </Navbar>
  );
}
