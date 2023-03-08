import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import { useUpdateItemQuantity } from '../../hooks/useCartItems';

interface QuantityProps {
  item: CartItem;
}

function Quantity({ item }: QuantityProps) {
  const mutation = useUpdateItemQuantity(item);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setQuantity(parseInt(e.target.value));
  }, []);

  useEffect(() => {
    const timeoutTimer = setTimeout(() => {
      if (quantity !== item.quantity && !mutation.isLoading) {
        mutation.mutate(quantity);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutTimer);
    };
  }, [quantity, item.quantity]);

  if (mutation.isLoading) {
    return <>Updating Quantity...</>
  }

  return (
    <input
      type="number"
      disabled={mutation.isLoading}
      value={quantity}
      onChange={handleQuantityChange}
    />
  );
}

export default Quantity;
