'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Favor, favorsService } from '@/lib/favorsService';
import { chatService } from '@/lib/chatService';
import ChatWindow from './ChatWindow';

export default function FavorCard({ favor, onStatusUpdate }: { favor: Favor; onStatusUpdate: () => void }) {
    const { user, spendKarma, addKarma } = useUser();
    const [loading, setLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);

    const isCreator = user?.id === favor.creator_id;

    const handleChat = async () => {
        if (!user) {
            alert('Inicia sesión para chatear.');
            return;
        }

        try {
            const id = await chatService.getOrCreateConversation(favor.id, user.id, favor.creator_id);
            setConversationId(id);
            setIsChatOpen(true);
        } catch (error) {
            console.error('Error starting chat:', error);
        }
    };

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
        <div className="group glass-card rounded-[2.5rem] p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/10 relative overflow-hidden">
            {/* Light Sweep Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[sweep_2s_infinite] pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${favor.type === 'ask' ? 'bg-red-500/10 text-red-600 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                    }`}>
                    {favor.type === 'ask' ? 'Necesito Ayuda' : 'Ofrezco Ayuda'}
                </div>
                <div className="flex items-center space-x-1.5 bg-yellow-400/10 text-yellow-700 px-3 py-1.5 rounded-2xl border border-yellow-400/20 font-display font-bold text-sm">
                    <span className="text-lg">✨</span>
                    <span>{favor.karma_value}</span>
                </div>
            </div>

            <h3 className="text-2xl font-display font-bold text-slate-800 mb-3 group-hover:text-primary-600 transition-colors leading-tight">{favor.title}</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed line-clamp-3">{favor.description}</p>

            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-600 font-bold text-sm overflow-hidden shadow-inner uppercase">
                        {favor.profiles?.avatar_url ? (
                            <img src={favor.profiles.avatar_url} alt={favor.profiles.full_name} className="w-full h-full object-cover" />
                        ) : (
                            favor.profiles?.full_name?.[0] || '?'
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Creador</span>
                        <span className="text-sm text-slate-700 font-bold">{favor.profiles?.full_name || 'Miembro'}</span>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    {!isCreator && user && (
                        <button
                            onClick={handleChat}
                            className="bg-slate-100 p-2.5 rounded-xl text-slate-500 hover:bg-primary-50 hover:text-primary-600 transition-all active:scale-95"
                            title="Chatear con el creador"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </button>
                    )}
                    <button
                        onClick={handleAction}
                        disabled={loading || isCreator}
                        className={`btn-premium px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest ${isCreator
                            ? 'from-slate-100 to-slate-200 text-slate-400 cursor-not-allowed shadow-none hover:translate-y-0'
                            : ''
                            }`}
                    >
                        {loading ? 'Procesando' : isCreator ? 'Tu Favor' : favor.type === 'ask' ? 'Ayudar' : 'Solicitar'}
                    </button>
                </div>
            </div>

            {isChatOpen && conversationId && (
                <ChatWindow
                    conversationId={conversationId}
                    onClose={() => setIsChatOpen(false)}
                    title={favor.title}
                />
            )}
        </div>
    );
}
