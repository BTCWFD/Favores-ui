'use client';

import { useEffect, useState } from 'react';
import { Favor, favorsService } from '@/lib/favorsService';
import FavorCard from './FavorCard';
import CreateFavorModal from './CreateFavorModal';
import { useUser } from '@/context/UserContext';

export default function Marketplace() {
    const [favors, setFavors] = useState<Favor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUser();

    const loadFavors = async () => {
        setLoading(true);
        try {
            const data = await favorsService.getActiveFavors();
            setFavors(data);
        } catch (error) {
            console.error('Error loading favors:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFavors();
    }, []);

    return (
        <section id="marketplace" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Marketplace de Solidaridad</h2>
                        <p className="text-gray-600 max-w-2xl">
                            Explora las necesidades de tu comunidad o encuentra habilidades que otros están ofreciendo sin dinero de por medio.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 whitespace-nowrap"
                    >
                        + Publicar Favor
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                    </div>
                ) : favors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favors.map((favor) => (
                            <FavorCard key={favor.id} favor={favor} onStatusUpdate={loadFavors} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="text-5xl mb-4">🤝</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Aún no hay favores activos</h3>
                        <p className="text-gray-500 mb-8">Sé el primero en ayudar o pedir ayuda a tu comunidad.</p>
                        <button
                            className="text-primary-600 font-bold hover:underline"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Publicar el primer favor
                        </button>
                    </div>
                )}
            </div>

            <CreateFavorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreated={loadFavors}
            />
        </section>
    );
}
