import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner';
import './App.css';

function App() {
  const [productDetails, setProductDetails] = useState(null);

  // Function to make the browser speak the text
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // Function called when barcode is successfully scanned
  const handleScanSuccess = (barcode) => {
    console.log("Scanned Barcode:", barcode);
    fetchProductDetails(barcode);
  };

  // Function to fetch product details from products.json
  const fetchProductDetails = async (barcode) => {
    try {
      const response = await fetch(`/products.json`);
      const data = await response.json();
      const product = data[barcode];

      if (product) {
        setProductDetails(product);
        speak(`This is ${product.name}. ${product.description}`);
      } else {
        speak("Sorry, I couldn't find any information on this product.");
      }
    } catch (error) {
      console.log("Error fetching product details:", error);
      speak("Sorry, I couldn't find any information on this product.");
    }
  };

  return (
    <div className="App">
      <h1>Visual Product Identification System</h1>
      <BarcodeScanner onScanSuccess={handleScanSuccess} />
      {productDetails && (
        <div className="product-details">
          <h2>Product Details</h2>
          <p><strong>Name:</strong> {productDetails.name}</p>
          <p><strong>Description:</strong> {productDetails.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
