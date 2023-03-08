import { useCartItems, useCartSubtotal } from '../../hooks/useCartItems';
import { useCallback } from 'react';

interface SummaryProps {
  shipping: ShippingOption;
}

function Summary({ shipping }: SummaryProps) {
  const cartItems = useCartItems();
  const subtotal = useCartSubtotal();

  const shippingPrice = shipping === 'normal' ? 100 : 200;
  const totalPrice = subtotal + shippingPrice;

  const onSubmit = useCallback(() => {
    console.log({
      cart: cartItems.data,
      shipping,
    });
  }, [cartItems.data, shipping]);

  return (
    <div>
      <h2>
        Summary
      </h2>
      {cartItems.isLoading ? (
        <div>Waiting for cart...</div>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td>kr {subtotal}</td>
              </tr>
              <tr>
                <td>Shipping:</td>
                <td>kr {shippingPrice}</td>
              </tr>
              <tr>
                <td>Total Price:</td>
                <td>kr {totalPrice}</td>
              </tr>
            </tbody>
          </table>
          <button style={{ marginTop: '1em' }} type="button" onClick={onSubmit}>
            Order!
          </button>
        </>
      )}
    </div>
  );
}

export default Summary;
