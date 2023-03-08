import { useCartItems, useCartSubtotal } from '../../hooks/useCartItems';

import Quantity from './Quantity';

function CartItems() {
  const items = useCartItems(true);
  const subTotal = useCartSubtotal();

  if (items.isFetching || items.isLoading) {
    return <>Loading items...</>;
  }

  if (items.isError || !items.isSuccess) {
    return <>{items.error.message}</>;
  }

  return (
    <table>
      <thead>
      <tr>
        <th>
          id
        </th>
        <th>
          name
        </th>
        <th>
          price
        </th>
        <th>
          quantity
        </th>
      </tr>
      </thead>
      <tbody>
      {items.data.map((item) => (
        <tr key={item.id}>
          <td>
            {item.id}
          </td>
          <td>
            {item.name}
          </td>
          <td>
            kr {item.price}
          </td>
          <td>
            <Quantity item={item} />
          </td>
        </tr>
      ))}
      </tbody>
      <tfoot>
      <tr>
        <td colSpan={2}>Subtotal:</td>
        <td>kr {subTotal}</td>
      </tr>
      </tfoot>
    </table>
  );
}

export default CartItems;
