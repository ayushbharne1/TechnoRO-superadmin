import { useState } from 'react';
import { Plus, Trash2, MapPin, MessageCircle, Calendar } from 'lucide-react';

export default function RecentlyServedManager({ servedCustomers = [], setServedCustomers }) {

  const [formData, setFormData] = useState({
    name: '',
    initials: '',
    date: '',
    address: '',
    query: '',
    status: 'Served'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const addCustomer = () => {
    if (formData.name.trim() && formData.date && formData.address.trim() && formData.query.trim()) {
      const newCustomer = {
        id: Date.now(),
        ...formData,
        initials: formData.initials || generateInitials(formData.name)
      };
      setServedCustomers([...(servedCustomers || []), newCustomer]);
      setFormData({
        name: '',
        initials: '',
        date: '',
        address: '',
        query: '',
        status: 'Served'
      });
    }
  };

  const deleteCustomer = (id) => {
    setServedCustomers((servedCustomers || []).filter(customer => customer.id !== id));
  };

  const getAvatarColor = (index) => {
    const colors = [
      'bg-blue-400',
      'bg-cyan-400',
      'bg-purple-400',
      'bg-pink-400',
      'bg-green-400',
      'bg-orange-400'
    ];
    return colors[index % colors.length];
  };

  const CustomerCard = ({ customer, index, onDelete }) => (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`${getAvatarColor(index)} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg`}>
            {customer.initials}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{customer.name}</h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <Calendar size={14} />
              <span>{customer.date}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            {customer.status}
          </span>
          <button
            onClick={() => onDelete(customer.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
            title="Delete Record"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 text-gray-700 font-medium mb-1">
            <MapPin size={16} className="text-red-500" />
            <span>Address</span>
          </div>
          <p className="text-gray-600 ml-6">{customer.address}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-700 font-medium mb-1">
            <MessageCircle size={16} className="text-blue-500" />
            <span>Customer Query</span>
          </div>
          <p className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg ml-6">
            {customer.query}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen border border-gray-300 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* <div className="bg-blue-500 p-3 rounded-xl relative">
              <Users className="text-white" size={32} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div> */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800"> Add Recently Served Customers </h1>
              {/* <p className="text-gray-500">Our recently served customers and their queries</p> */}
            </div>
          </div>
          {/* <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold">
            Active Records
          </div> */}
        </div>

        {/* Add Customer Form */}
        <div className="bg-white rounded-2xl mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Customer Record</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Nitesh Thool"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initials (Optional)
              </label>
              <input
                type="text"
                name="initials"
                value={formData.initials}
                onChange={handleInputChange}
                placeholder="Auto-generated if empty"
                maxLength="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from name</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition"
              >
                <option value="Served">Served</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g., Dr.Ambedkar Nagar Dharampeth Nagpur"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Query *
              </label>
              <textarea
                name="query"
                value={formData.query}
                onChange={handleInputChange}
                placeholder="e.g., lg ro service centre near me"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition resize-none"
              />
            </div>
          </div>

          <button
            onClick={addCustomer}
            className="mt-6 bg-[#7ec1b1] hover:bg-[#7ec1b1] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Customer Record
          </button>
        </div>

        {/* Customer Records */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Customer Records ({(servedCustomers || []).length})
          </h2>

          {(servedCustomers || []).length === 0 ? (
            <div className="bg-white rounded-2xl  p-12 text-center text-gray-500">
              No customer records yet. Add your first record above!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(servedCustomers || []).map((customer, index) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  index={index}
                  onDelete={deleteCustomer}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}