import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../stores/useCartStore';
import { NotificationSnackbar } from '../NotificationSnackbar/NotificationSnackbar';

// CLASE 24: Recepción de datos individuales vía props ({ product }).
export const ProductCard = ({ product }) => {
  // CLASE 28: Obtención de la función addToCart del store global.
  const addToCart = useCartStore((state) => state.addToCart);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <Card 
        variant="outlined" 
        sx={{ 
          width: '100%', 
          maxWidth: 320, 
          height: 420, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          alignItems: 'center', 
          textAlign: 'center',
          margin: '0 auto',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
          }
        }}
      >
        <Box 
          sx={{ 
            display: 'grid', 
            placeItems: 'center', 
            width: '100%', 
            height: 200, 
            p: 1.5, 
            bgcolor: '#fff',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
        >
          <Box 
            component="img" 
            src={product.image} 
            alt={product.title} 
            sx={{ 
              maxWidth: '100%', 
              maxHeight: 180, 
              width: 'auto', 
              height: 'auto', 
              objectFit: 'contain'
            }} 
          />
        </Box>

        <CardContent 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            p: 2,
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize', display: 'block' }}>
            {product.category}
          </Typography>

          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600, 
              mt: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              height: '2.8em'
            }} 
            title={product.title}
          >
            {product.title}
          </Typography>

          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700, mt: 1 }}>
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', gap: 1, pb: 2, width: '100%' }}>
          {/* CLASE 27: Enlace dinámico pasando la ID del producto */}
          <Button 
            size="small" 
            variant="outlined" 
            startIcon={<VisibilityIcon />}
            component={Link} 
            to={`/producto/${product.id}`}
          >
            Detalle
          </Button>

          <Button 
            size="small" 
            variant="contained" 
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Agregar
          </Button>
        </CardActions>
      </Card>

      <NotificationSnackbar 
        open={openSnackbar} 
        onClose={handleCloseSnackbar} 
        message={`¡${product.title.substring(0, 20)}... agregado!`}
      />
    </>
  );
};