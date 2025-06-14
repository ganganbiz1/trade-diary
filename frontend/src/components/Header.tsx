'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp,
  Menu as MenuIcon,
  Home,
  Create,
  BarChart,
  Person,
} from '@mui/icons-material';
import { useState } from 'react';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'ホーム', icon: <Home />, href: '/' },
    { label: '新規投稿', icon: <Create />, href: '/new-post' },
    { label: '統計', icon: <BarChart />, href: '/stats' },
    { label: 'プロフィール', icon: <Person />, href: '/profile' },
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp 
              sx={{ 
                fontSize: 32, 
                color: 'primary.main',
                transform: 'rotate(15deg)'
              }} 
            />
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                background: 'linear-gradient(45deg, #1976d2 30%, #dc004e 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Trade Diary
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  startIcon={item.icon}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.label} onClick={handleMenuClose}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {item.icon}
                      {item.label}
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 