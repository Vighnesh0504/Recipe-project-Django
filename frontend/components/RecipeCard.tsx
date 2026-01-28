import React from 'react';

interface Recipe {
    id: number;
    recipe_name: string;
    ingredients: string;
    recipe: string;
    image: string | null;
}

interface RecipeCardProps {
    recipe: Recipe;
    onEdit: (recipe: Recipe) => void;
    onDelete: (id: number) => void;
    onView: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onEdit, onDelete, onView }) => {
    const imageUrl = recipe.image
        ? (recipe.image.startsWith('http') ? recipe.image : `http://127.0.0.1:8000${recipe.image}`)
        : 'https://via.placeholder.com/300?text=No+Image';

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-700 flex flex-col">
            <div className="h-48 overflow-hidden cursor-pointer relative group" onClick={() => onView(recipe)}>
                <img
                    src={imageUrl}
                    alt={recipe.recipe_name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium transition-opacity">
                        View Details
                    </span>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{recipe.recipe_name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{recipe.ingredients}</p>
                <div className="flex gap-2 mt-auto">
                    <button
                        onClick={() => onView(recipe)}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                        View
                    </button>
                    <button
                        onClick={() => onEdit(recipe)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(recipe.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
