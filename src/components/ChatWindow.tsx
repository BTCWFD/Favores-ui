'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser } from '@/context/UserContext';
import { chatService, Message } from '@/lib/chatService';

interface ChatWindowProps {
    conversationId: string;
    onClose: () => void;
    title: string;
}

export default function ChatWindow({ conversationId, onClose, title }: ChatWindowProps) {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!conversationId) return;

        // Initial load
        const loadMessages = async () => {
            setLoading(true);
            try {
                const data = await chatService.getMessages(conversationId);
                setMessages(data);
            } catch (error) {
                console.error('Error loading messages:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();

        // Subscription
        const subscription = chatService.subscribeToMessages(conversationId, (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [conversationId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        const content = newMessage.trim();
        setNewMessage('');

        try {
            await chatService.sendMessage(conversationId, user.id, content);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="fixed bottom-24 right-6 z-[90] w-full max-w-[400px] h-[550px] flex flex-col glass-card border-slate-200/50 shadow-2xl rounded-[2.5rem] overflow-hidden animate-entrance">
            {/* Header */}
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                <div>
                    <h4 className="font-display font-black text-sm uppercase tracking-widest">{title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black opacity-60">EN LÍNEA</span>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    ✕
                </button>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50"
            >
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-8">
                        <span className="text-3xl mb-4">👋</span>
                        <p className="text-xs text-slate-400 font-medium font-display leading-relaxed">
                            ¡Dile hola! Coordina los detalles del favor de forma segura aquí.
                        </p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`
                                max-w-[80%] p-4 rounded-3xl text-sm font-medium
                                ${msg.sender_id === user?.id
                                    ? 'bg-primary-500 text-white rounded-tr-none'
                                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'}
                            `}>
                                {msg.content}
                                <div className={`text-[9px] mt-1 opacity-60 ${msg.sender_id === user?.id ? 'text-white' : 'text-slate-400'}`}>
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
                <button
                    disabled={!newMessage.trim()}
                    className="w-11 h-11 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                    <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
