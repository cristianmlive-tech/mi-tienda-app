import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Card, 
  Divider, 
  IconButton, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../stores/useCartStore';

export const Cart = () => {
  // CLASE 28/29: Consumo de la lista y funciones del store de Zustand
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingBagIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Tu carrito está vacío
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          ¿Aún no te decidiste? Explorá nuestro catálogo y sumá tus productos favoritos.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          component={Link} 
          to="/" 
          startIcon={<ArrowBackIcon />}
        >
          Ir al Catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        Mi Carrito de Compras
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        
        <Box sx={{ flexGrow: 1 }}>
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="center">Precio</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="center">Subtotal</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          src={item.image} 
                          alt={item.title} 
                          variant="rounded" 
                          sx={{ width: 50, height: 50, objectFit: 'contain', bgcolor: '#fff' }} 
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600, maxWidth: 220 }}>
                          {item.title}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      ${item.price.toFixed(2)}
                    </TableCell>

                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        
                        <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 20 }}>
                          {item.quantity}
                        </Typography>

                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>

                    <TableCell align="center" sx={{ fontWeight: 700 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton 
                        color="error" 
                        onClick={() => removeFromCart(item.id)}
                        title="Eliminar producto"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button 
            variant="text" 
            color="error" 
            onClick={clearCart} 
            sx={{ mt: 2 }}
          >
            Vaciar Carrito
          </Button>
        </Box>

        <Box sx={{ width: { xs: '100%', md: 320 } }}>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Resumen del Pedido
            </Typography>
            
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Productos ({cart.reduce((acc, i) => acc + i.quantity, 0)})</Typography>
              <Typography sx={{ fontWeight: 600 }}>${getTotalPrice().toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">Envío</Typography>
              <Typography color="success.main" sx={{ fontWeight: 600 }}>Gratis</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                ${getTotalPrice().toFixed(2)}
              </Typography>
            </Box>

            <Button variant="contained" fullWidth size="large" sx={{ py: 1.5 }}>
              Finalizar Compra
            </Button>
          </Card>
        </Box>

      </Box>
    </Container>
  );
};