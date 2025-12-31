import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function Faq() {
  const [faqs, setFaqs] = useState([
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const addFAQ = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newFAQ = {
        id: Date.now(),
        question: newQuestion,
        answer: newAnswer
      };
      setFaqs([...faqs, newFAQ]);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  const deleteFAQ = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  return (
    <div className='border border-gray-300 p-4'>
      <div className="mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ">FAQ</h1>
        
        {/* Add FAQ Form */}
        <div className="bg-white mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New FAQ</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter your question here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer
              </label>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Enter your answer here..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none transition resize-none"
              />
            </div>
            <button
              onClick={addFAQ}
              className=" bg-[#7EC1B1] hover:bg-[#68a998] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add More FAQ
            </button>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 border border-gray-200 p-4 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">FAQ List</h2>
          {faqs.length === 0 ? (
            <div className="bg-white text-center text-gray-500">
              No FAQs yet. Add your first question above!
            </div>
          ) : (
            faqs.map((faq ,idx) => (
              <div
                key={faq.id}
                className="bg-white transition duration-200"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Que {idx + 1} : {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      Ans: {faq.answer}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteFAQ(faq.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition duration-200"
                    title="Delete FAQ"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}