import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, TextField, Button, Grid, MenuItem, Select
} from '@mui/material';
import { API_BASE_URL } from '../config';

// component to add or edit an item
export function AddItem(props) {

  // getting props
  const { onCancel, onCreate, item } = props;

  const isEdit = !!item;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (item) {
      setName(item.ItemName);
      setPrice(item.SellingPrice.toString());
      setStatus(item.IsActive === 'Y' ? 'Active' : 'In-Active');
    }
  }, [item]);

  const generateItemCode = () => {
    return "IT" + Math.floor(10000 + Math.random() * 90000);
  };

  const handleSubmit = async () => {
    const payload = {
      ItemName: name,
      SellingPrice: price,
      IsActive: status === 'Active' ? 'Y' : 'N'
    };

    if (isEdit) {
      await axios.put(API_BASE_URL + "items/" + item?.ItemCode, payload);
     } else {
      await axios.post(API_BASE_URL + "items", {
        ItemCode: generateItemCode(),
        ...payload
      });
    }

    onCreate();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        {isEdit ? "Edit Item" : "Add Item"}
      </Typography>

      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Item Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Selling Price" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Select fullWidth value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="In-Active">In-Active</MenuItem>
          </Select>
        </Grid>

      </Grid>

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Update" : "Create"}
        </Button>
      </Box>
    </Box>
  );
}