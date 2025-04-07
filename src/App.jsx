import { useState } from "react";

function App() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProduct, setAddedProduct] = useState([]);

  const updateProductQuantity = (name, quantity) => {
    setAddedProduct(curr =>
      curr.map(p => p.name === name ? { ...p, quantity } : p)
    );
  };

  const addToCart = (product) => {
    const alreadyAddedProduct = addedProduct.find(p => p.name === product.name);

    if (alreadyAddedProduct) {
      updateProductQuantity(alreadyAddedProduct.name, alreadyAddedProduct.quantity + 1);
    } else {
      setAddedProduct(curr => [...curr, {
        ...product,
        quantity: 1
      }]);
    }
  };

  const removeFromCart = (product) => {
    setAddedProduct(curr => curr.filter(p => p.name !== product.name));
  };

  const totalToPay = addedProduct.reduce(
    (acc, p) => acc + (p.price * p.quantity),
    0);

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
                <button onClick={() => removeFromCart(item)} style={{ marginLeft: "10px" }}>
                  Rimuovi dal carrello
                </button>
              </li>
            ))}
          </ul>
          <h3>Totale da pagare: {totalToPay.toFixed(2)}€</h3>
        </>
      )}
    </>
  );
}

export default App;
