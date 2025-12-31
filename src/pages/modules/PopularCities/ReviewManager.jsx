import { useState } from 'react';
import { Plus, Trash2, Star } from 'lucide-react';

export default function ReviewManager() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Gurgaon, Maharashtra',
      rating: 5,
      review: 'Being a student on a budget. I love that RO Care show me exactly what I\'ll pay upfront. The eco-friendly Products options are a huge plus and i can easily repair with with just few click.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    review: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const addReview = () => {
    if (formData.name.trim() && formData.location.trim() && formData.review.trim()) {
      const newReview = {
        id: Date.now(),
        ...formData
      };
      setReviews([...reviews, newReview]);
      setFormData({
        name: '',
        location: '',
        rating: 5,
        review: '',
        image: ''
      });
    }
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const StarRating = ({ rating, onRatingChange, interactive = false }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            className={`${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition' : ''}`}
            onClick={() => interactive && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const ReviewCard = ({ review, onDelete }) => (
    <div className="bg-white rounded-2xl shadow-md p-6 transition duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <img
            src={review.image || 'https://via.placeholder.com/80'}
            alt={review.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{review.name}</h3>
            <p className="text-gray-500">{review.location}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(review.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
          title="Delete Review"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      <div className="mb-3">
        <StarRating rating={review.rating} />
      </div>
      
      <p className="text-gray-700 leading-relaxed">"{review.review}"</p>
    </div>
  );

  return (
    <div className='border border-gray-300 p-4  mt-6'>
      <div className=" mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ">
          Add and Manage Reviews
        </h1>

        {/* Add Review Form */}
        <div className="bg-white mb-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Review</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Sarah Johnson"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Gurgaon, Maharashtra"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition"
              />
            </div>
          </div>

<div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData(prev => ({
                        ...prev,
                        image: reader.result
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#84c9b917] file:text-[#7ec1b1]  file:cursor-pointer"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Select an image from your device</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <StarRating
              rating={formData.rating}
              onRatingChange={handleRatingChange}
              interactive={true}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Text *
            </label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Enter customer review..."
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ec1b1] focus:border-transparent outline-none transition resize-none"
            />
          </div>

          <button
            onClick={addReview}
            className=" bg-[#7ec1b1] hover:bg-[#7ec1b1] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Review
          </button>
        </div>

        {/* Reviews List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            All Reviews ({reviews.length})
          </h2>
          
          {reviews.length === 0 ? (
            <div className="bg-white p-5 text-center text-gray-500">
              No reviews yet. Add your first review above!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onDelete={deleteReview}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}