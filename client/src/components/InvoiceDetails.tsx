import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Button
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';

// component that shows details of a selected invoice
export function InvoiceDetails(props) {

  // props destructuring inside component
  const { invoice, onBack } = props;

  // default values for details
  const name = invoice.customerName;
  const address = invoice.address || "Gurgaon, Haryana";
  const pan = invoice.pan || "BCNSG1234H";
  const gst = invoice.gst || "06BCNSG1234H1Z5";
  const quantity = invoice.quantity || 1;

  return (
    <Box sx={{ p: 4 }}>
      {/* this button goes back to previous screen */}
      <Button 
        onClick={onBack} 
        startIcon={<ArrowLeft size={18} />}
        sx={{ mb: 2, color: '#1e1b4b', fontWeight: 600, textTransform: 'none' }}
      >
        Back to Dashboard
      </Button>

      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
        Invoice Details
      </Typography>

      <Box sx={{ border: '1px solid #e2e8f0', borderRadius: '4px', bgcolor: '#ffffff' }}>
        
        {/* header part of the box */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>Customer Details</Typography>
          <Typography sx={{ fontWeight: 700 }}>Invoice ID: {invoice.id}</Typography>
        </Box>

        {/* Info displayed here */}
        <Box sx={{ p: 3 }}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: 600 }}>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <Box component="span" sx={{ fontWeight: 800 }}>{name}</Box></Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: 600 }}>Address &nbsp;: <Box component="span" sx={{ fontWeight: 800 }}>{address}</Box></Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: 600 }}>Pan Card : <Box component="span" sx={{ fontWeight: 800 }}>{pan}</Box></Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: 600 }}>GST Num : <Box component="span" sx={{ fontWeight: 800 }}>{gst}</Box></Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Typography sx={{ fontWeight: 800 }}>Items</Typography>
        </Box>
        <Divider sx={{ mx: 2 }} />

        {/* item table head */}
        <Box sx={{ p: 2, px: 3 }}>
          <Grid container sx={{ fontWeight: 800 }}>
            <Grid size={{ xs: 6 }}>
              <Typography sx={{ fontWeight: 800 }}>Name</Typography>
            </Grid>
            <Grid size={{ xs: 3 }} sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 800 }}>Amount</Typography>
            </Grid>
            <Grid size={{ xs: 3 }} sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontWeight: 800 }}>Amount</Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mx: 2 }} />

        {/* display the items logic */}
        <Box sx={{ p: 2, px: 3 }}>
          <Grid container alignItems="center">
            <Grid size={{ xs: 6 }}>
              <Typography sx={{ fontWeight: 700 }}>{invoice.itemName}</Typography>
            </Grid>
            <Grid size={{ xs: 3 }} sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 800 }}>{quantity}</Typography>
            </Grid>
            <Grid size={{ xs: 3 }} sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontWeight: 800 }}>{invoice.amount}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mx: 2 }} />

        {/* bottom row for total amount */}
        <Box sx={{ p: 2, px: 3, bgcolor: '#f9fafb' }}>
          <Grid container alignItems="center">
            <Grid size={{ xs: 6 }} />
            <Grid size={{ xs: 3 }} sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 800 }}>Total</Typography>
            </Grid>
            <Grid size={{ xs: 3 }} sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontWeight: 800 }}>{invoice.amount}</Typography>
            </Grid>
          </Grid>
        </Box>

      </Box>
    </Box>
  );
}
