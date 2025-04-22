// Importiamo lo useState da React per gestire lo stato
import { useState } from "react";

function App() {
  // Lista dei prodotti disponibili nel negozio
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  // Stato che contiene i prodotti aggiunti al carrello
  const [addedProduct, setAddedProduct] = useState([]);

  // Funzione per aggiornare la quantità di un prodotto nel carrello
  const updateProductQuantity = (name, quantity) => {
    setAddedProduct(curr =>
      curr.map(p =>
        p.name === name
          ? { ...p, quantity } // se il nome combacia, aggiorniamo la quantità
          : p // altrimenti restituiamo l’oggetto com’è
      )
    );
  };

  // Funzione per aggiungere un prodotto al carrello
  const addToCart = (product) => {
    const alreadyAddedProduct = addedProduct.find(p => p.name === product.name);

    if (alreadyAddedProduct) {
      // Se il prodotto è già presente, aumentiamo la quantità di 1
      updateProductQuantity(alreadyAddedProduct.name, alreadyAddedProduct.quantity + 1);
    } else {
      // Altrimenti lo aggiungiamo con quantità iniziale 1
      setAddedProduct(curr => [...curr, {
        ...product,
        quantity: 1
      }]);
    }
  };

  // Funzione per rimuovere un prodotto completamente dal carrello
  const removeFromCart = (product) => {
    setAddedProduct(curr => curr.filter(p => p.name !== product.name));
  };

  // Calcolo del totale da pagare: prezzo * quantità per ogni prodotto
  const totalToPay = addedProduct.reduce(
    (acc, p) => acc + (p.price * p.quantity),
    0
  );

  return (
    <>
      {/* Titolo della sezione prodotti */}
      <h1>Prodotti disponibili</h1>

      {/* Lista dei prodotti con pulsante per aggiungerli al carrello */}
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

      {/* Se ci sono prodotti nel carrello, mostriamo la sezione Carrello */}
      {addedProduct.length > 0 && (
        <>
          <h2>Carrello</h2>
          <ul>
            {/* Lista dei prodotti nel carrello con nome, prezzo, quantità e bottone per rimuovere */}
            {addedProduct.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price.toFixed(2)}€ x {item.quantity}
                <button
                  onClick={() => removeFromCart(item)}
                  style={{ marginLeft: "10px" }}
                >
                  Rimuovi dal carrello
                </button>
              </li>
            ))}
          </ul>

          {/* Mostra il totale finale da pagare */}
          <h3>Totale da pagare: {totalToPay.toFixed(2)}€</h3>
        </>
      )}
    </>
  );
}

export default App;
