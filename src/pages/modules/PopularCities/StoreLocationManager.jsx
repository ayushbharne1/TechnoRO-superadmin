import { useState } from 'react';
import { Plus, Trash2, MapPin, Clock, Navigation } from 'lucide-react';

export default function StoreLocationManager({ storeLocations = [], setStoreLocations }) {

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    timing: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addStore = () => {
    if (formData.name.trim() && formData.address.trim() && formData.timing.trim()) {
      const newStore = {
        id: Date.now(),
        ...formData
      };
      setStoreLocations([...(storeLocations || []), newStore]);
      setFormData({
        name: '',
        address: '',
        timing: ''
      });
    }
  };

  const deleteStore = (id) => {
    setStoreLocations((storeLocations || []).filter(store => store.id !== id));
  };

  const StoreCard = ({ store, onDelete }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-200">
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">{store.name}</h3>
        <div className="flex items-center gap-2">
          <MapPin className="text-blue-600" size={28} />
          <button
            onClick={() => onDelete(store.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition ml-2"
            title="Delete Store"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">ADDRESS</h4>
          <p className="text-gray-700 leading-relaxed">{store.address}</p>
        </div>

        <div className="flex items-center gap-2 text-green-600">
          <Clock size={20} />
          <span className="font-medium">{store.timing}</span>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2">
          <Navigation size={20} />
          Get Directions
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen border border-gray-300 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className=" mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Nearby Store Locations</h1>
        </div>

        {/* Add Store Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Store Location</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., RO Care India Nagpur"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g., Sbi bank Sharda chowk,, Near, Manewada,, Nagpur, Maharashtra, 440024"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opening Hours *
              </label>
              <input
                type="text"
                name="timing"
                value={formData.timing}
                onChange={handleInputChange}
                placeholder="e.g., 10 AM To 10 PM"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition"
              />
            </div>

            <button
              onClick={addStore}
              className="w-full bg-gradient-to-r from-[#7ec1b1] to-[#7ec1b1] hover:from-[#7ec1b1] hover:to-[#7ec1b1] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Store Location
            </button>
          </div>
        </div>

        {/* Store Locations List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            All Store Locations ({(storeLocations || []).length})
          </h2>

          {(storeLocations || []).length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center text-gray-500">
              No store locations yet. Add your first store above!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {(storeLocations || []).map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onDelete={deleteStore}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}