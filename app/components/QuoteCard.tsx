
"use client";

import { Quote } from "@/app/types/quote";
import { useState } from "react";

export default function QuoteCard({ quote }: { quote: Quote }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editText, setEditText] = useState(quote.text);
  const [editAuthor, setEditAuthor] = useState(quote.author);
  const handleDelete = async () => {
    try {
      console.log("Deleting quote with ID:", quote.id);
      const response = await fetch(`/api/quotes/${quote.id}`, {
        method: "DELETE",
      });
      
      console.log("Delete response status:", response.status);
      
      if (response.ok) {
        console.log("Quote deleted successfully");
        setShowDeleteModal(false);
        // Refresh the page to update the quotes list
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Delete failed:", errorData);
        alert(`Failed to delete quote: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
      alert("Error deleting quote");
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/quotes/${quote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText, author: editAuthor }),
      });
      
      if (response.ok) {
        setShowEditModal(false);
        // Refresh the page to update the quotes list
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Failed to update quote: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error updating quote:", error);
      alert("Error updating quote");
    }
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 relative group">
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg transform hover:scale-110 transition-all duration-200"
            title="Edit quote"
          >
            ✎
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg transform hover:scale-110 transition-all duration-200"
            title="Delete quote"
          >
            ×
          </button>
        </div>
        <div className="pr-16">
          <p className="text-lg font-medium text-gray-800 leading-relaxed mb-4 italic">
            "{quote.text}"
          </p>
          <div className="text-sm text-gray-600">
            <p className="font-semibold text-gray-700">— {quote.author}</p>
            <p className="text-xs mt-2 text-gray-500">
              📅 {new Date(quote.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Quote</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quote Text
                </label>
                <textarea
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  placeholder="Enter your inspirational quote..."
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Who said this?"
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-500 text-white py-3 px-6 rounded-xl hover:bg-gray-600 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
                >
                  Update Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Delete Quote</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this quote? This action cannot be undone.</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white py-3 px-6 rounded-xl hover:bg-gray-600 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg"
              >
                Delete Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}