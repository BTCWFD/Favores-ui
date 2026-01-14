'use client';

import { useEffect, useState } from 'react';
import { transactionService, Transaction } from '@/lib/transactionService';
import { useUser } from '@/context/UserContext';

export default function TransactionLedger() {
    const { user } = useUser();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchHistory();
        }
    }, [user]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await transactionService.getUserTransactions(user!.id);
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <section id="ledger" className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl animate-entrance">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">Libro Contable de Karma</h2>
                    <p className="text-slate-500 text-lg font-medium">Transparencia absoluta en tus intercambios solidarios</p>
                </div>

                <div className="glass-card rounded-[3rem] p-6 sm:p-10">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Verificando Ledger...</span>
                        </div>
                    ) : transactions.length > 0 ? (
                        <div className="space-y-6">
                            {transactions.map((tx) => {
                                const isIncoming = tx.receiver_id === user.id;
                                return (
                                    <div key={tx.id} className="group bg-slate-50/50 p-6 rounded-[2rem] flex items-center justify-between border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 active:scale-[0.99] cursor-default">
                                        <div className="flex items-center space-x-6">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${isIncoming ? 'bg-emerald-100/50 text-emerald-600' : 'bg-red-100/50 text-red-600'
                                                }`}>
                                                {isIncoming ? '⇣' : '⇡'}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-display font-bold text-slate-800 leading-tight group-hover:text-primary-600 transition-colors">
                                                    {tx.favors?.title || 'Protocolo del Sistema'}
                                                </h4>
                                                <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">
                                                    {new Date(tx.created_at).toLocaleDateString('es-ES', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`text-2xl font-display font-black ${isIncoming ? 'text-emerald-600' : 'text-red-500'
                                            }`}>
                                            {isIncoming ? '+' : '-'}{tx.amount}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-7xl mb-6 opacity-20 text-slate-300">📖</div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Sin actividad registrada en tu historial</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 p-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary-500/20 relative overflow-hidden group">
                    {/* Animated background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full -mr-20 group-hover:scale-125 transition-transform duration-700" />

                    <div className="relative z-10 text-center md:text-left">
                        <h3 className="text-2xl font-display font-black mb-2 tracking-tight">Capa de Invisibilidad & Seguridad</h3>
                        <p className="text-primary-100 font-medium opacity-90">Todas las transacciones están firmadas y protegidas por nuestra arquitectura de integridad distribuida.</p>
                    </div>
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl shadow-xl relative z-10 border border-white/30">
                        🛡️
                    </div>
                </div>
            </div>
        </section>
    );
}
