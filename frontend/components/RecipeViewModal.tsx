import React from 'react';

interface Recipe {
    id: number;
    recipe_name: string;
    ingredients: string;
    recipe: string;
    image: string | null;
}

interface RecipeViewModalProps {
    recipe: Recipe;
    onClose: () => void;
}

const RecipeViewModal: React.FC<RecipeViewModalProps> = ({ recipe, onClose }) => {
    const imageUrl = recipe.image
        ? (recipe.image.startsWith('http') ? recipe.image : `http://127.0.0.1:8000${recipe.image}`)
        : 'https://via.placeholder.com/600x400?text=No+Image';

    return (
        <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 max-w-4xl w-full mx-auto overflow-hidden flex flex-col max-h-[90vh]">
            <div className="relative h-64 sm:h-80 w-full shrink-0">
                <img
                    src={imageUrl}
                    alt={recipe.recipe_name}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-8 overflow-y-auto">
                <h2 className="text-3xl font-bold text-white mb-6">{recipe.recipe_name}</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-3 uppercase tracking-wider">Ingredients</h3>
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                                {recipe.ingredients}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-purple-400 mb-3 uppercase tracking-wider">Instructions</h3>
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                                {recipe.recipe}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-right">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeViewModal;
