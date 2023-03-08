import { useState } from 'react';

import Cart from '../Cart/Cart';
import Shipping from '../Cart/Shipping';

import './App.css'
import Summary from '../Cart/Summary';

function App() {
  // we can also put this in a context if we also want to save shipping address for instance, up to you
  const [shipping, setShipping] = useState<ShippingOption>('normal');

  return (
    <div className="App">
      <Cart />
      <Shipping value={shipping} onUpdate={setShipping} />
      <Summary shipping={shipping} />
    </div>
  )
}

export default App
