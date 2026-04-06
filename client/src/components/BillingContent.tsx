import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import { CirclePlus } from 'lucide-react';
import { SelectCustomerDialog } from './SelectCustomerDialog';

// this shows the billing page
export function BillingContent() {

  // state to open the customer selection modal
  const [openModal, setOpenModal] = useState(false);

  // function when customer is selected
  const handleSelectCustomer = (customer) => {
    console.log('Selected:', customer);
    setOpenModal(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
        Billing
      </Typography>

      <Paper 
        elevation={0} 
        sx={{ 
          border: '1px solid #e2e8f0', 
          borderRadius: '4px',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#fafafa' 
        }}
      >
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid #e2e8f0', 
          bgcolor: '#ffffff',
          borderRadius: '4px 4px 0 0'
        }}>
          <Typography sx={{ fontWeight: 700 }}>Customer Details</Typography>
        </Box>

        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          mb: 4
        }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ffffff',
              color: '#1e1b4b',
              fontWeight: 800,
              fontSize: '1.1rem',
              py: 1.5,
              px: 4,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0',
              textTransform: 'none',
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: '#f8fafc',
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
              },
              display: 'flex',
              gap: 1.5,
              alignItems: 'center'
            }}
            onClick={() => setOpenModal(true)}
          >
            <CirclePlus size={24} color="#ffffffff" fill="#1e1b4b" style={{ color: 'white' }} />
            <Box component="span" sx={{ color: '#1e1b4b' }}>ADD</Box>
          </Button>
        </Box>
      </Paper>

      {/* modal for selecting customer */}
      <SelectCustomerDialog 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        onSelect={handleSelectCustomer}
      />
    </Box>
  );
}
