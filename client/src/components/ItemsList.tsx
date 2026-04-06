import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, Button, Grid, Card, CardContent, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton
} from '@mui/material';
import { CirclePlus, Trash2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

// component that lists all items
export function ItemsList(props) {

  // getting props
  const { onAddClick, onEditClick } = props;

  const [items, setItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchItems = async () => {
    // API call to get items
    const res = await axios.get(API_BASE_URL + "items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    // deleting the item
    await axios.delete(API_BASE_URL + "items/" + selectedId);
    setOpenDialog(false);
    fetchItems();
  };

  return (
    <Box sx={{ p: 4 }}>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>ITEMS</Typography>

        <Button variant="contained" onClick={onAddClick} startIcon={<CirclePlus size={22} />}>
          ADD
        </Button>
      </Box>

      <Grid container spacing={3}>
        {items.map((item) => {
          return (
            <Grid key={item.ItemCode} size={{ xs: 12, sm: 6, md: 4 }}>

              <Card sx={{ position: 'relative', cursor: 'pointer' }}>

                <CardContent onClick={() => onEditClick(item)}>
                  <Typography variant="h6">{item.ItemName}</Typography>

                  <Typography sx={{ mt: 1 }}>
                    ₹ {item.SellingPrice}
                  </Typography>

                  <Chip
                    label={item.IsActive === 'Y' ? 'Active' : 'In-Active'}
                    sx={{ mt: 2 }}
                    color={item.IsActive === 'Y' ? 'success' : 'error'}
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
                    handleDeleteClick(item.ItemCode);
                  }}
                >
                  <Trash2 size={18} />
                </IconButton>

              </Card>

            </Grid>
          )
        })}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this item?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}