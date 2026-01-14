'use client';

import { useState } from 'react';
import { favorsService } from '@/lib/favorsService';
import { useUser } from '@/context/UserContext';

export default function CreateFavorModal({ isOpen, onClose, onCreated }: { isOpen: boolean; onClose: () => void; onCreated: () => void }) {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'ask' as 'ask' | 'offer',
        category: 'Habilidades',
        karma_value: 10
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert('Debes iniciar sesión para publicar.');
            return;
        }

        setLoading(true);
        try {
            await favorsService.createFavor({
                creator_id: user.id,
                ...formData
            });
            onCreated();
            onClose();
        } catch (error) {
            console.error('Error creating favor:', error);
            alert('Hubo un error al publicar tu favor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all">
            <div className="bg-white/90 backdrop-blur-xl w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 fade-in duration-300">

                <div className="p-8 sm:p-10">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                                Publicar Favor
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">Comparte o solicita ayuda con tu comunidad</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Type Selector */}
                        <div className="flex p-1 bg-gray-100 rounded-2xl">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'ask' })}
                                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${formData.type === 'ask' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Necesito Ayuda
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'offer' })}
                                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${formData.type === 'offer' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Ofrezco Ayuda
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Título del favor</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Ej: Enseñar React básico"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 transition-all"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Descripción detallada</label>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="¿En qué consiste el intercambio?"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Categoría</label>
                                    <select
                                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-800 focus:ring-2 focus:ring-primary-500 transition-all appearance-none"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Habilidades</option>
                                        <option>Transporte</option>
                                        <option>Cuidado</option>
                                        <option>Préstamos</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Karma Tokens</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="100"
                                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-800 focus:ring-2 focus:ring-primary-500 transition-all"
                                        value={formData.karma_value}
                                        onChange={(e) => setFormData({ ...formData, karma_value: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-5 rounded-[1.25rem] font-bold text-lg shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? 'Publicando...' : 'Publicar Ahora'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
