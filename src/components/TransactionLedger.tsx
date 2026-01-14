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
        <section id="ledger" className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Libro Contable de Karma</h2>
                    <p className="text-gray-500">Transparencia total en tus intercambios solidarios</p>
                </div>

                <div className="bg-gray-50 rounded-[2.5rem] p-4 sm:p-8 border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                        </div>
                    ) : transactions.length > 0 ? (
                        <div className="space-y-4">
                            {transactions.map((tx) => {
                                const isIncoming = tx.receiver_id === user.id;
                                return (
                                    <div key={tx.id} className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-gray-50 transition-all hover:scale-[1.01]">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${isIncoming ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                {isIncoming ? '⇣' : '⇡'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 leading-tight">
                                                    {tx.favors?.title || 'Transferencia directa'}
                                                </h4>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(tx.created_at).toLocaleDateString('es-ES', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`text-lg font-black ${isIncoming ? 'text-green-600' : 'text-red-500'
                                            }`}>
                                            {isIncoming ? '+' : '-'}{tx.amount}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-3 opacity-20">📖</div>
                            <p className="text-gray-400 text-sm">Aún no hay transacciones registradas.</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100 flex items-center justify-between">
                    <div>
                        <p className="text-primary-800 font-bold">Respaldo Inmutable</p>
                        <p className="text-primary-600 text-xs">Todas las transacciones están protegidas por integridad SQL.</p>
                    </div>
                    <div className="text-2xl">🛡️</div>
                </div>
            </div>
        </section>
    );
}
