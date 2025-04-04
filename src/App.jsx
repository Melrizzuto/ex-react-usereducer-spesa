import { useState } from "react";

function App() {
  const [addedProduct, setAddedProduct] = useState([]);

  const addToCart = (product) => {
    const productIsAlreadyAdd = addedProduct.some(p => p.name === product.name);
    if (productIsAlreadyAdd) {
      return;
    }
    setAddedProduct(curr => [
      ...curr,
      {
        ...product,
        quantity: 1
      }
    ]);
  };

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  return (
    <>
      <h1>Prodotti disponibili</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <p>
              {product.name} - {product.price.toFixed(2)}€
            </p>
            <button onClick={() => addToCart(product)}>
              Aggiungi al carrello
            </button>
          </li>
        ))}
      </ul>

      {addedProduct.length > 0 && (
        <>
          <h2>Carrello</h2>
          <ul>
            {addedProduct.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price.toFixed(2)}€ x {item.quantity}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default App;
