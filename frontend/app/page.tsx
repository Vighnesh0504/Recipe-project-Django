'use client';

import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import RecipeViewModal from '../components/RecipeViewModal';

interface Recipe {
  id: number;
  recipe_name: string;
  ingredients: string;
  recipe: string;
  image: string | null;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);

  const fetchRecipes = async (searchQuery = '') => {
    setLoading(true);
    try {
      const url = searchQuery
        ? `http://127.0.0.1:8000/api/recipes/?search=${encodeURIComponent(searchQuery)}`
        : 'http://127.0.0.1:8000/api/recipes/';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecipes(search);
  };

  const handleAddClick = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleViewClick = (recipe: Recipe) => {
    setViewingRecipe(recipe);
  };

  const handleDeleteClick = async (id: number) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/recipes/${id}/`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setRecipes(recipes.filter(r => r.id !== id));
      } else {
        alert('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Error deleting recipe');
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      let url = 'http://127.0.0.1:8000/api/recipes/';
      let method = 'POST';

      if (editingRecipe) {
        url = `http://127.0.0.1:8000/api/recipes/${editingRecipe.id}/`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Submission failed:', errorData);
        throw new Error('Failed to submit form');
      }

      await fetchRecipes(search);
      setIsModalOpen(false);
      setEditingRecipe(null);
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe');
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto relative">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          Food Recipes
        </h1>
        <p className="text-gray-400 text-lg mb-8">Discover, create, and share amazing recipes</p>

        <button
          onClick={handleAddClick}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
        >
          + Add New Recipe
        </button>
      </header>

      <div className="mb-10 max-w-md mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search recipes..."
            className="flex-1 bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={() => handleEditClick(recipe)}
              onDelete={() => handleDeleteClick(recipe.id)}
              onView={() => handleViewClick(recipe)}
            />
          ))}
          {recipes.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No recipes found. Click "Add New Recipe" to get started!
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <RecipeForm
              initialData={editingRecipe}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}

      {viewingRecipe && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <RecipeViewModal
            recipe={viewingRecipe}
            onClose={() => setViewingRecipe(null)}
          />
        </div>
      )}
    </main>
  );
}
