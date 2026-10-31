import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CircularProgress, 
  Alert, 
  Box, 
  Chip, 
  Rating 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useFetch } from '../../hooks/useFetch';
import { useCartStore } from '../../stores/useCartStore';

export const ProductDetail = () => {
  // CLASE 27: Captura del parámetro :id enviado por la ruta
  const { id } = useParams();
  
  // CLASE 26: Consulta puntual del producto mediante useFetch
  const { data: product, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);
  const addToCart = useCartStore((state) => state.addToCart);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          {error ? `Error: ${error}` : 'Producto no encontrado'}
        </Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          component={Link} 
          to="/" 
          sx={{ mt: 2 }}
        >
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        component={Link} 
        to="/" 
        sx={{ mb: 3 }}
      >
        Volver al catálogo
      </Button>

      <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Box 
          sx={{ 
            display: 'grid', 
            placeItems: 'center', 
            width: '100%', 
            mb: 3 
          }}
        >
          <Box 
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              maxHeight: 350,
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />
        </Box>

        <CardContent sx={{ textAlign: 'center', p: 0 }}>
          <Chip 
            label={product.category} 
            color="primary" 
            size="small" 
            sx={{ textTransform: 'capitalize', mb: 1 }} 
          />

          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            {product.title}
          </Typography>

          {product.rating && (
            <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
              <Rating value={product.rating.rate} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.rating.count} opiniones)
              </Typography>
            </Box>
          )}

          <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700, my: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            {product.description}
          </Typography>

          <Button 
            variant="contained" 
            size="large" 
            startIcon={<ShoppingCartIcon />}
            onClick={() => addToCart(product)}
            sx={{ px: 4, py: 1.5 }}
          >
            Agregar al Carrito
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};
export default ProductDetail;