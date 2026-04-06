import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar 
} from '@mui/material';

// component for the sidebar navigation
export function Sidebar(props) {

  // destructuring the props
  const { drawerWidth, menuItems, activeTab, onTabChange } = props;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { 
          width: drawerWidth, 
          boxSizing: 'border-box' 
        },
      }}
    >
      <Toolbar /> 
      
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {menuItems.map((item) => {
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  selected={activeTab === item.text}
                  onClick={() => onTabChange(item.text)}
                  sx={{ 
                    py: 1.5, 
                    px: 3,
                    '&.Mui-selected': {
                      backgroundColor: '#f1f5f9',
                      borderRight: '4px solid #1e1b4b',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: activeTab === item.text ? '#000000' : '#64748b' }}>
                    {item.icon}
                  </ListItemIcon>
                  
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontSize: '1rem', 
                      fontWeight: activeTab === item.text ? 700 : 500,
                      color: activeTab === item.text ? '#000000' : '#64748b'
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Drawer>
  );
}
