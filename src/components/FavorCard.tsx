'use client';

import { Favor, favorsService } from '@/lib/favorsService';
import { useUser } from '@/context/UserContext';
import { useState } from 'react';

export default function FavorCard({ favor, onStatusUpdate }: { favor: Favor; onStatusUpdate: () => void }) {
    const { user, spendKarma, addKarma } = useUser();
    const [loading, setLoading] = useState(false);

    const isCreator = user?.id === favor.creator_id;

    const handleAction = async () => {
        if (!user) {
            alert('Debes iniciar sesión para interactuar.');
            return;
        }

        setLoading(true);
        try {
            if (favor.type === 'ask' && !isCreator) {
                // Someone is asking for help, I want to help them
                await favorsService.updateFavorStatus(favor.id, 'in_progress');
                // Logic: In a real app, this would notify the creator
                alert('¡Genial! Te has postulado para ayudar.');
            } else if (favor.type === 'offer' && !isCreator) {
                // Someone is offering help, I want to request it
                if (user.id) { // Simple check
                    await favorsService.updateFavorStatus(favor.id, 'in_progress');
                    alert('Has solicitado esta ayuda.');
                }
            }
            onStatusUpdate();
        } catch (error) {
            console.error('Error updating favor:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${favor.type === 'ask' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                    {favor.type === 'ask' ? 'Necesito Ayuda' : 'Ofrezco Ayuda'}
                </div>
                <div className="flex items-center space-x-1 text-yellow-600 font-bold text-sm">
                    <span>✨</span>
                    <span>{favor.karma_value}</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">{favor.title}</h3>
            <p className="text-gray-600 text-sm mb-6 line-clamp-3">{favor.description}</p>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs overflow-hidden">
                        {favor.profiles?.avatar_url ? (
                            <img src={favor.profiles.avatar_url} alt={favor.profiles.full_name} />
                        ) : (
                            favor.profiles?.full_name?.[0] || '?'
                        )}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{favor.profiles?.full_name || 'Usuario'}</span>
                </div>

                <button
                    onClick={handleAction}
                    disabled={loading || isCreator}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isCreator
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'
                        }`}
                >
                    {loading ? '...' : isCreator ? 'Tu Favor' : favor.type === 'ask' ? 'Ayudar' : 'Solicitar'}
                </button>
            </div>
        </div>
    );
}
