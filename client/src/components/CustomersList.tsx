import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { CirclePlus, Trash2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

// this component shows the list of customers
export function CustomersList(props) {

  // props being used
  const { onAddClick, onEditClick } = props;

  const [customers, setCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  //  Open confirm dialog for delete
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  //  Cancel delete operation
  const handleCancel = () => {
    setOpenDialog(false);
    setSelectedId(null);
  }

  //  Confirm and call delete api
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(API_BASE_URL + "customers/" + selectedId);
      
      setOpenDialog(false);
      setSelectedId(null);
      fetchCustomers(); // refresh the list
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          CUSTOMERS
        </Typography>

        <Button
          variant="contained"
          onClick={onAddClick}
          startIcon={<CirclePlus size={22} />}
        >
          ADD
        </Button>
      </Box>

      <Grid container spacing={3}>
        {customers.map((customer) => {
          return (
            <Grid key={customer.CustID} size={{ xs: 12, sm: 6, md: 4 }}>
              
              <Card sx={{ position: 'relative', cursor: 'pointer' }}>

                <CardContent onClick={() => onEditClick(customer)}>
                  <Typography variant="h6">
                    {customer.CustName}
                  </Typography>

                  <Chip
                    label={customer.isActive === 'Y' ? 'Active' : 'In-Active'}
                    sx={{ mt: 2 }}
                    color={customer.isActive === 'Y' ? 'success' : 'error'}
                  />
                </CardContent>

                <IconButton
                  size="small"
                  color="error"
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleDeleteClick(customer.CustID);
                  }}
                >
                  <Trash2 size={18} />
                </IconButton>

              </Card>

            </Grid>
          )
        })}
      </Grid>

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this customer?
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}