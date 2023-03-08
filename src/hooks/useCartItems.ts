import { useMutation, useQuery } from '@tanstack/react-query';

declare global {
  interface Window {
    cartItems: CartItem[];
  }
}

const items: CartItem[] = [
  {
    id: '123_123',
    name: 'First Item',
    quantity: 2,
    price: 200,
  },
  {
    id: '321_123',
    name: 'Second Item',
    quantity: 10,
    price: 1000,
  },
  {
    id: '456',
    name: 'Last Item',
    quantity: 1,
    price: 100,
  }
];

window.cartItems = items;

const PROMISE_TIMEOUT = 1000;

const fetchCartItems = () => {
  return new Promise<CartItem[]>((resolve) => {
    setTimeout(() => {
      resolve(window.cartItems);
    }, PROMISE_TIMEOUT);
  });
};

export function useCartItems(refetchOnMount = false) {
  return useQuery<CartItem[], Error>(
    ['cart_items'],
    fetchCartItems,
    {
      refetchOnWindowFocus: false,
      refetchOnMount,
    },
  );
}

export function useUpdateItemQuantity(item: CartItem) {
  const cartItems = useCartItems();

  return useMutation<void, Error, number>(
    ['cart_item_quantity', item.id],
    (quantity: number): Promise<void> => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          window.cartItems = window.cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity,
                price: quantity * 100,
              };
            }

            return cartItem;
          });

          resolve();
        }, PROMISE_TIMEOUT);
      });
    },
    {
      onSuccess: () => {
        cartItems.refetch();
      },
    },
  );
}

export function useCartSubtotal() {
  const cartItems = useCartItems();

  if (!cartItems.data) {
    return 0;
  }

  return cartItems.data.reduce((acc, item) => acc + item.price, 0);
}
