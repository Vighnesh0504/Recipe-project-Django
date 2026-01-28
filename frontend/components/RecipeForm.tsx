import React, { useState, useEffect } from 'react';

interface Recipe {
    id?: number;
    recipe_name: string;
    ingredients: string;
    recipe: string;
    image: string | null;
}

interface RecipeFormProps {
    initialData?: Recipe | null;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.recipe_name);
            setIngredients(initialData.ingredients);
            setInstructions(initialData.recipe);
        } else {
            setName('');
            setIngredients('');
            setInstructions('');
            setImage(null);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('recipe_name', name);
        formData.append('ingredients', ingredients);
        formData.append('recipe', instructions);
        if (image) {
            formData.append('image', image);
        }

        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-2xl w-full mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
                {initialData ? 'Edit Recipe' : 'Add New Recipe'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-400 mb-2">Recipe Name</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">Ingredients</label>
                    <textarea
                        required
                        rows={3}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">Instructions</label>
                    <textarea
                        required
                        rows={5}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">Image</label>
                    {initialData?.image && !image && (
                        <div className="mb-2">
                            <p className="text-sm text-gray-500 mb-1">Current Image:</p>
                            <img
                                src={initialData.image.startsWith('http') ? initialData.image : `http://127.0.0.1:8000${initialData.image}`}
                                alt="Current"
                                className="h-20 w-auto object-cover rounded border border-gray-600"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : (initialData ? 'Update Recipe' : 'Create Recipe')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RecipeForm;
