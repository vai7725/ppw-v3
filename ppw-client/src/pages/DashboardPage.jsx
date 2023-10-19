import React from 'react';
import Navbar from '../features/navbar/Navbar';
import Dashboard from '../features/dashboard/components/Dashboard';

export default function DashboardPage() {
  return (
    <Navbar>
      <Dashboard />
    </Navbar>
  );
}
