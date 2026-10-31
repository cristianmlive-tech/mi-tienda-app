import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// CLASE 28/29: Zustand - Creación del store global reactivo con create().
// CLASE 30: Middleware persist - Guarda automáticamente el estado en localStorage bajo 'cart-storage'.
export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      // CLASE 28: Actualización inmutable del arreglo para agregar o incrementar cantidad.
      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...currentCart, { ...product, quantity: 1 }] });
        }
      },

      // CLASE 28: Eliminación de ítem filtrando por id.
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      // CLASE 28: Actualización directa de la cantidad de unidades.
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      // CLASE 28: Limpieza completa del estado del carrito.
      clearCart: () => set({ cart: [] }),

      // CLASE 28: Helpers de cálculo dinámico para unidades acumuladas y precio total.
      getTotalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
      getTotalPrice: () => get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);