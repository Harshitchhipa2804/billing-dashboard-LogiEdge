import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Chip,
  CircularProgress
} from '@mui/material';
import { API_BASE_URL } from '../config';

// modal component to select a customer
export function SelectCustomerDialog(props) {

  // getting props from parent
  const { open, onClose, onSelect } = props;

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      // call the function to get customers
      fetchCustomers();
    }
  }, [open]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE_URL + "customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '12px', p: 1 }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Select Customer
        </Typography>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={onClose}
          sx={{ 
            textTransform: 'none', 
            borderRadius: '8px',
            fontWeight: 600,
            px: 3
          }}
        >
          Cancel
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pb: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {customers.map((customer) => {
              return (
                <Grid size={{ xs: 12, sm: 6 }} key={customer.CustID}>
                  <Card 
                    variant="outlined"
                    onClick={() => onSelect(customer)}
                    sx={{ 
                      p: 2.5, 
                      cursor: 'pointer', 
                      borderRadius: '12px',
                      borderColor: '#e2e8f0',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: '#1e1b4b',
                        backgroundColor: '#f8fafc',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '100px'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e1b4b', mb: 1 }}>
                      {customer.CustName}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Chip 
                        label={customer.isActive === 'Y' ? 'Active' : 'In-Active'}
                        size="small"
                        sx={{ 
                          fontWeight: 700,
                          backgroundColor: customer.isActive === 'Y' ? '#dcfce7' : '#fee2e2',
                          color: customer.isActive === 'Y' ? '#166534' : '#991b1b',
                          borderRadius: '6px'
                        }}
                      />
                    </Box>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}
