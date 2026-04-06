import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { InvoiceDetails } from './InvoiceDetails';

// data for the dashboard
const mockInvoices = [
  { id: 'INVC224830', customerName: 'Gupta Enterprize Pvt. Ltd.', itemName: 'Laptop', amount: 85000 },
];

// this shows the main dashboard with invoices
export function DashboardContent() {
  
  // setting up the state for navigation and searching
  const [view, setView] = useState('list');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // logic to filter the list
  const filteredInvoices = mockInvoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // if user clicks view button show details
  if (view === 'details' && selectedInvoice) {
    return (
      <InvoiceDetails 
        invoice={selectedInvoice} 
        onBack={() => {
          setView('list');
          setSelectedInvoice(null);
        }} 
      />
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
        Dashboard
      </Typography>

      <Box sx={{ mb: 4, maxWidth: 400 }}>
        <TextField
          fullWidth
          placeholder="Search by Invoice ID"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#f1f5f9',
              borderRadius: '8px',
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
      </Box>

      {/* Header bar of the grid */}
      <Paper 
        elevation={0}
        sx={{ 
          backgroundColor: '#1e1b4b', 
          color: '#ffffff', 
          p: 2, 
          borderRadius: '4px 4px 0 0',
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Grid container spacing={2} sx={{ px: 2 }}>
          <Grid size={{ xs: 2.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Invoice ID</Typography>
          </Grid>
          <Grid size={{ xs: 3.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Customer name</Typography>
          </Grid>
          <Grid size={{ xs: 2.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Item name (s)</Typography>
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Amount</Typography>
          </Grid>
          <Grid size={{ xs: 1.5 }} /> 
        </Grid>
      </Paper>

      {/* Rendering the data rows */}
      <Box sx={{ border: '1px solid #e2e8f0', borderRadius: '0 0 4px 4px', overflow: 'hidden' }}>
        {filteredInvoices.map((invoice) => {
          return (
            <Box 
              key={invoice.id} 
              sx={{ 
                p: 2, 
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #f1f5f9',
                '&:last-child': { borderBottom: 'none' }
              }}
            >
              <Grid container spacing={2} alignItems="center" sx={{ px: 2 }}>
                <Grid size={{ xs: 12, md: 2.5 }}>
                  <Typography sx={{ fontWeight: 800 }}>{invoice.id}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 3.5 }}>
                  <Typography sx={{ fontWeight: 700, color: '#4b5563' }}>{invoice.customerName}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 2.5 }}>
                  <Typography sx={{ color: '#4b5563', fontWeight: 600 }}>{invoice.itemName}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Typography sx={{ fontWeight: 800 }}>{invoice.amount}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 1.5 }} sx={{ textAlign: 'right' }}>
                  <Button 
                    variant="contained" 
                    size="small"
                    sx={{ 
                      backgroundColor: '#1e1b4b', 
                      textTransform: 'none', 
                      borderRadius: '6px',
                      px: 3,
                      boxShadow: 'none',
                    }}
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setView('details');
                    }}
                  >
                    View
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )
        })}

        {filteredInvoices.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">No invoices found matching "{searchQuery}"</Typography>
          </Box>
        )}

      </Box>
    </Box>
  );
}
