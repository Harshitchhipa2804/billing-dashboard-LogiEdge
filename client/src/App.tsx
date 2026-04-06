import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Toolbar
} from '@mui/material';
import { LayoutDashboard, ShieldCheck, ReceiptText } from 'lucide-react';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MasterContent } from './components/MasterContent';
import { CustomersList } from './components/CustomersList';
import { AddCustomer } from './components/AddCustomer';
import { ItemsList } from './components/ItemsList';
import { AddItem } from './components/AddItem';
import { DashboardContent } from './components/DashboardContent';
import { BillingContent } from './components/BillingContent';

// Basic theme for the app
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e1b4b',
    },
    background: {
      default: '#f8fafc',
    },
  }
});

const drawerWidth = 240;

export default function App() {
  // State for tracking active tab
  const [activeTab, setActiveTab] = useState('Master');

  // Sub view for master tab
  const [masterSubView, setMasterSubView] = useState('grid');

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      text: 'Master',
      icon: <ShieldCheck size={20} />,
    },
    {
      text: 'Billing',
      icon: <ReceiptText size={20} />,
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === 'Master') {
      setMasterSubView('grid');
      setSelectedCustomer(null);
      setSelectedItem(null);
    }
  };

  // function to render the main content
  const renderContent = () => {

    if (activeTab === 'Master') {
      if (masterSubView === 'customers') {
        return (
          <CustomersList
            onAddClick={() => {
              setSelectedCustomer(null);
              setMasterSubView('add-customer');
            }}
            onEditClick={(customer) => {
              setSelectedCustomer(customer);
              setMasterSubView('add-customer');
            }}
          />
        );
      }

      if (masterSubView === 'add-customer') {
        return (
          <AddCustomer
            customer={selectedCustomer}
            onCancel={() => {
              setSelectedCustomer(null);
              setMasterSubView('customers');
            }}
            onCreate={() => {
              setSelectedCustomer(null);
              setMasterSubView('customers');
            }}
          />
        );
      }

      if (masterSubView === 'items') {
        return (
          <ItemsList
            onAddClick={() => {
              setSelectedItem(null);
              setMasterSubView('add-item');
            }}
            onEditClick={(item) => {
              setSelectedItem(item);
              setMasterSubView('add-item');
            }}
          />
        );
      }

      if (masterSubView === 'add-item') {
        return (
          <AddItem
            item={selectedItem}
            onCancel={() => {
              setSelectedItem(null);
              setMasterSubView('items');
            }}
            onCreate={() => {
              setSelectedItem(null);
              setMasterSubView('items');
            }}
          />
        );
      }

      return (
        <MasterContent
          onCardClick={(view) => {
            setMasterSubView(view);
          }}
        />
      );
    }

    if (activeTab === 'Dashboard') {
      return <DashboardContent />;
    }

    if (activeTab === 'Billing') {
      return <BillingContent />;
    }

    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Header />

        <Sidebar
          drawerWidth={drawerWidth}
          menuItems={menuItems}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <Box
          component="main"
          sx={{ 
            flexGrow: 1,
            bgcolor: '#f8fafc',
            minHeight: '100vh',
          }}
        >
          <Toolbar />
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}