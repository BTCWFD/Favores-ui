'use client';

import { useUser } from '@/context/UserContext';
import { useState, useEffect } from 'react';
import AchievementCard from './AchievementCard';
import { supabase } from '@/lib/supabase';
import { chatService, Conversation } from '@/lib/chatService';
import ChatWindow from './ChatWindow';

export default function ProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { user, karma, verificationStatus, isVerified, achievements, peopleHelpedCount, favorsCompletedCount, signOut } = useUser();
    const [conversations, setConversations] = useState<(Conversation & { favors: { title: string } })[]>([]);
    const [activeChat, setActiveChat] = useState<{ id: string, title: string } | null>(null);

    useEffect(() => {
        if (!isOpen || !user) return;

        const fetchConversations = async () => {
            const { data, error } = await supabase
                .from('conversations')
                .select('*, favors(title)')
                .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setConversations(data as any);
            }
        };

        fetchConversations();
    }, [isOpen, user]);

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl animate-entrance flex flex-col md:flex-row">
                {/* Left Sidebar: ID Card Style */}
                <div className="w-full md:w-80 bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white flex flex-col justify-between">
                    <div>
                        <div className="w-32 h-32 mx-auto mb-6 relative">
                            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-accent-500 rounded-3xl rotate-3 shadow-xl flex items-center justify-center text-4xl font-display font-black overflow-hidden">
                                {user.email?.[0].toUpperCase()}
                            </div>
                            {isVerified && (
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg">
                                    ✓
                                </div>
                            )}
                        </div>

                        <div className="text-center mb-10">
                            <h3 className="text-xl font-display font-black truncate">{user.email}</h3>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">
                                {isVerified ? 'Ciudadano Certificado' : 'Ciudadano Nivel 1'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Reputación Karma</div>
                                <div className="text-2xl font-display font-black text-primary-400">{karma} ✨</div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">ID Único</div>
                                <div className="text-[10px] font-mono text-slate-500 truncate">{user.id}</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={signOut}
                        className="mt-10 text-red-400 hover:text-red-300 font-black uppercase tracking-widest text-[10px] transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white p-8 md:p-12 overflow-y-auto">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h2 className="text-3xl font-display font-black text-slate-900">Tu Legado Social</h2>
                            <p className="text-slate-500 font-medium mt-1">Has salvado el día {peopleHelpedCount} veces.</p>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors uppercase font-black text-xs tracking-widest">
                            Cerrar [ESC]
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-12">
                        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                            <div className="text-3xl font-display font-black text-slate-800">{peopleHelpedCount}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gente Ayudada</div>
                        </div>
                        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                            <div className="text-3xl font-display font-black text-slate-800">{favorsCompletedCount}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Misiones Realizadas</div>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h4 className="text-lg font-display font-black text-slate-800 mb-6 flex items-center space-x-2">
                            <span>💬</span>
                            <span>Conversaciones Activas</span>
                        </h4>
                        <div className="space-y-3">
                            {conversations.length > 0 ? conversations.map(conv => (
                                <button
                                    key={conv.id}
                                    onClick={() => setActiveChat({ id: conv.id, title: conv.favors.title })}
                                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-primary-50 border border-slate-100 rounded-2xl transition-all group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                            {conv.favors.title[0]}
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-black text-slate-800">{conv.favors.title}</div>
                                            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Coordinando detalles...</div>
                                        </div>
                                    </div>
                                    <span className="text-slate-400 group-hover:text-primary-500">→</span>
                                </button>
                            )) : (
                                <div className="py-8 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <p className="text-slate-400 text-sm font-medium">No tienes chats activos.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-10">
                        <h4 className="text-lg font-display font-black text-slate-800 mb-6 flex items-center space-x-2">
                            <span>🏅</span>
                            <span>Logros Recientes</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {achievements.length > 0 ? achievements.slice(0, 4).map(a => (
                                <AchievementCard key={a.id} achievement={a} />
                            )) : (
                                <div className="col-span-2 py-8 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <p className="text-slate-400 text-sm font-medium">Sigue ayudando para desbloquear medallas.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {activeChat && (
                <ChatWindow
                    conversationId={activeChat.id}
                    title={activeChat.title}
                    onClose={() => setActiveChat(null)}
                />
            )}
        </div>
    );
}
