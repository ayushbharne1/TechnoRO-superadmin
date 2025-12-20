import React, { useState } from "react";

const PaymentGatewayForm = () => {
  const [gatewayName, setGatewayName] = useState("");
  const [paymentModes, setPaymentModes] = useState("");
  const [productStatus, setProductStatus] = useState("Publish");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ gatewayName, paymentModes, productStatus });
  };

  return (
    <div className="absolute bg-white shadow-md rounded-lg overflow-hidden"
    style={{ width: "1092px", height: "905px", top: "96px", left: "324px", padding: "24px", gap: "24px" }}
>
      <h2 className="text-xl font-semibold mb-4">Payment Gateway Name</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
       
          <input
            type="text"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter Payment Gateway Name"
            value={gatewayName}
            onChange={(e) => setGatewayName(e.target.value)}
          />
        </div>
        <div>
        <h2 className="text-xl font-semibold mb-4">Payment Modes</h2>
         
          <input
            type="text"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter Payment Modes"
            value={paymentModes}
            onChange={(e) => setPaymentModes(e.target.value)}
          />
        </div>
        <div>
        <h2 className="text-xl font-semibold mb-4">Product Status</h2>
        
          <select
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            value={productStatus}
            onChange={(e) => setProductStatus(e.target.value)}
          >
            <option value="Publish">Publish</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
        >
          Add Payment Gateway
        </button>
      </form>
    </div>
  );
};

export default PaymentGatewayForm;
