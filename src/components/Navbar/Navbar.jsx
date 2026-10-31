import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Container, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../stores/useCartStore';

// CLASE 23/24: Componente Navbar estructural.
export const Navbar = () => {
  // CLASE 28/29: Suscripción en tiempo real al estado del carrito en Zustand.
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* CLASE 27: Enlace de navegación SPA hacia la raíz '/' */}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
            <StorefrontIcon sx={{ mr: 1, fontSize: 30 }} />
            <Typography variant="h6" noWrap sx={{ fontWeight: 700, letterSpacing: '.1rem' }}>
              MI TIENDA
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              Catálogo
            </Button>
            
            <IconButton color="inherit" component={Link} to="/carrito">
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};