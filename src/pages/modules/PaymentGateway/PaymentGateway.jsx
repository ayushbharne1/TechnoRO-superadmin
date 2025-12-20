import Addpro from "../../../components/Addpro";
import { useNavigate } from "react-router-dom";
const PaymentGateway = () => {
  const navigate = useNavigate();
    
  const PaymentGatewayForm = () => {
    navigate('/PaymentGatewayForm'); // Ensure this route matches your actual path
  };
  const gateways = [
    { id: 1, name: "Razorpay", modes: "Card, UPI, Net banking, Wallet(Phone Pe, Amazon Pay, Freecharge)", status: "Published" },
    { id: 2, name: "COD", modes: "Pay via Cash at the time of delivery, It's free and only takes a few minutes", status: "Published" },
    { id: 3, name: "Paypal", modes: "Credit/Debit card with Easier way to pay – online and on your mobile.", status: "Published" },
    { id: 4, name: "Paytm", modes: "Credit/Debit card, net banking, paytm wallet", status: "Published" },
    { id: 5, name: "Stripe", modes: "Accept all major debit and credit cards from customers in every country", status: "Published" }
  ];

  return (
    <div>
    <Addpro/>
    <div className="p-4 w-full border h-195">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse  bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">SL. No.</th>
              <th className="p-3 text-left">Gateway Name</th>
              <th className="p-3 text-left">Payment Modes</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {gateways.map((gateway, index) => (
              <tr key={gateway.id} className=" bg-gray-100 hover:bg-gray-100">
                <td className="p-3">{String(index + 1).padStart(2, '0')}</td>
                <td className="p-3">{gateway.name}</td>
                <td className="p-3">{gateway.modes}</td>
                <td className="p-3">
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                    {gateway.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={PaymentGatewayForm} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    ✏️
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between  mt-96 items-center p-4 ">
          <span className="text-gray-600">Showing 1 to 5 of 5 Entries</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md text-gray-600">Previous</button>
            <button className="px-3 py-1 bg-green-300 text-gray-700 rounded-md">1</button>
            <button className="px-3 py-1 border rounded-md text-gray-600">Next</button>
          </div>
        </div>
    </div>
    </div>
  );
};

export default PaymentGateway;