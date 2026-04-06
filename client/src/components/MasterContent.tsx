import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

// this shows the master tab cards
export function MasterContent(props) {
  
  // getting props
  const { onCardClick } = props;

  const cards = [
    { title: 'Customer', description: 'Read or Create customer data', view: 'customers' },
    { title: 'Items', description: 'Read or Create items data', view: 'items' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#000000', fontWeight: 700 }}>
        Master
      </Typography>
      
      <Grid container spacing={3}>
        {cards.map((card) => {
          return (
            <Grid key={card.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card 
                onClick={() => onCardClick?.(card.view)}
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1, color: '#000000', fontWeight: 600 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

    </Box>
  );
}
