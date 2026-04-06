import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select
} from '@mui/material';
import { API_BASE_URL } from '../config';

// component to add or edit a customer
export function AddCustomer(props) {

  // getting props
  const { onCancel, onCreate, customer } = props;

  const isEdit = !!customer;

  // form states
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pan, setPan] = useState('');
  const [gst, setGst] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (customer) {
      setName(customer.CustName);
      setAddress(customer.CustAddress);
      setPan(customer.CustPAN);
      setGst(customer.CustGST);
      setStatus(customer.isActive === 'Y' ? 'Active' : 'In-Active');
    }
  }, [customer]);

  const generateCustID = () => {
    return "C" + Math.floor(10000 + Math.random() * 90000);
  };

  // function to save data
  const handleSubmit = async () => {
    try {
      const payload = {
        CustName: name,
        CustAddress: address,
        CustPAN: pan,
        CustGST: gst,
        isActive: status === 'Active' ? 'Y' : 'N'
      };

      if (isEdit) {
        // updating existing
        await axios.put(API_BASE_URL + "customers/" + customer?.CustID, payload);

      } else {
        // creating new
        await axios.post(API_BASE_URL + "customers", {
          CustID: generateCustID(),
          ...payload
        });

      }

      onCreate();

    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        {isEdit ? "Edit Customer" : "Add Customer"}
      </Typography>

      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField fullWidth label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField fullWidth label="PAN" value={pan} onChange={(e) => setPan(e.target.value)} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField fullWidth label="GST" value={gst} onChange={(e) => setGst(e.target.value)} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Select fullWidth value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="In-Active">In-Active</MenuItem>
          </Select>
        </Grid>

      </Grid>

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Update" : "Create"}
        </Button>
      </Box>

    </Box>
  );
}