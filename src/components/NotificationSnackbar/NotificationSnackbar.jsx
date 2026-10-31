import React from 'react';
import { Snackbar, Alert } from '@mui/material';

// CLASE 25: Componente modal tipo Toast que recibe props para controlar su apertura y cierre.
export const NotificationSnackbar = ({ open, onClose, message = "¡Producto agregado al carrito!" }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default NotificationSnackbar;