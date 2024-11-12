import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const BarcodeScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader", 
      { fps: 10, qrbox: 250 }
    );

    scanner.render(
      (decodedText) => onScanSuccess(decodedText),
      (error) => console.warn("QR code scan error:", error)
    );

    return () => {
      scanner.clear().catch((error) => console.error("Error clearing scanner:", error));
    };
  }, [onScanSuccess]);

  return <div id="reader" style={{ width: "300px", height: "300px", margin: "0 auto" }}></div>;
};

export default BarcodeScanner;
