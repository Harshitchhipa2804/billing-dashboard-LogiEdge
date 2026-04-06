import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { ReceiptText } from 'lucide-react';

// component for the top header bar
export function Header() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: 64 }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.15)', 
              p: 1, 
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <ReceiptText size={24} color="#ffffff" />
          </Box>
          <Typography variant="h6" noWrap sx={{ fontWeight: 900, letterSpacing: '1px', color: '#ffffff' }}>
            BILLING DASHBOARD
          </Typography>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
