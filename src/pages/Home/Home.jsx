import { useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Box, TextField, MenuItem, Pagination } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import { ProductCard } from '../../components/ProductCard/ProductCard';

export const Home = () => {
  // CLASE 26: Petición de la lista completa de productos a la API FakeStore
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = ['all', "electronics", "jewelery", "men's clothing", "women's clothing"];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  // CLASE 25: Filtrado reactivo por texto y categoría
  const filteredProducts = products ? products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  // CLASE 30: Cálculo dinámico de páginas e índices con .slice()
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Error al cargar los productos: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        Catálogo de Productos
      </Typography>

      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
        }}
      >
        <TextField
          label="Buscar producto..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, minWidth: '250px' }}
        />

        <TextField
          select
          label="Categoría"
          value={selectedCategory}
          onChange={handleCategoryChange}
          sx={{ minWidth: '200px' }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
              {cat === 'all' ? 'Todas las categorías' : cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {currentProducts.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          No se encontraron productos que coincidan con los criterios.
        </Typography>
      ) : (
        <>
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 3,
              justifyItems: 'center',
              alignItems: 'stretch',
              width: '100%',
              mb: 4
            }}
          >
            {/* CLASE 24: Mapeo del subconjunto paginado hacia componentes ProductCard */}
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>

          {/* CLASE 30: Componente Pagination para control dinámico de páginas */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;