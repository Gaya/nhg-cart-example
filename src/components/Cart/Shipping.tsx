import { ChangeEventHandler, useCallback } from 'react';
import { useCartItems } from '../../hooks/useCartItems';

interface ShippingProps {
  value: ShippingOption;
  onUpdate: (newValue: ShippingOption) => void;
}

function Shipping({ value, onUpdate }: ShippingProps) {
  const cartItems = useCartItems();

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const nextValue = e.target.value;

    if (nextValue === 'normal' || nextValue === 'express') {
      onUpdate(nextValue);
    }
  }, [onUpdate]);

  return (
    <div>
      <h2>Shipping</h2>
      {cartItems.isLoading ? (
        <div>Waiting for cart...</div>
      ) : (
        <>
          Pick Shipping Option
          <fieldset>
            <label htmlFor="shipping_normal">
              <input
                id="shipping_normal"
                checked={value === 'normal'}
                type="radio" name="shipping"
                onChange={onChangeHandler}
                value="normal"
              />
              Normal (kr 100)
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="shipping_express">
              <input
                id="shipping_express"
                checked={value === 'express'}
                type="radio" name="shipping"
                value="express"
                onChange={onChangeHandler}
              />
              Express (kr 200)
            </label>
          </fieldset>
        </>
      )}
    </div>
  );
}

export default Shipping;
