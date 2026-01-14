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
        <section id="marketplace" className="py-32 bg-slate-50 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 animate-entrance">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">Marketplace de Solidaridad</h2>
                        <p className="text-slate-500 text-lg max-w-2xl font-medium">
                            Explora las necesidades de tu comunidad o encuentra habilidades que otros están ofreciendo sin dinero de por medio.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-premium px-10 py-4 rounded-2xl shadow-2xl flex items-center space-x-3"
                    >
                        <span className="text-xl">+</span>
                        <span className="uppercase tracking-widest text-sm">Publicar Favor</span>
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Sincronizando Marketplace...</span>
                    </div>
                ) : favors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {favors.map((favor) => (
                            <FavorCard key={favor.id} favor={favor} onStatusUpdate={loadFavors} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 glass-card rounded-[3rem] border-2 border-dashed border-slate-200">
                        <div className="text-7xl mb-6">🤝</div>
                        <h3 className="text-2xl font-display font-black text-slate-800 mb-3">Aún no hay misiones activas</h3>
                        <p className="text-slate-500 mb-10 max-w-md mx-auto font-medium">Sé el primero en ayudar o pedir ayuda a tu comunidad y comienza a construir tu Karma.</p>
                        <button
                            className="text-primary-600 font-black uppercase tracking-widest text-xs hover:tracking-[0.2em] transition-all"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Publicar el primer favor →
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
