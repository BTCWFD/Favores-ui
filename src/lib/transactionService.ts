import { supabase } from './supabase';

export interface Transaction {
    id: string;
    sender_id: string;
    receiver_id: string;
    favor_id: string;
    amount: number;
    created_at: string;
    favors?: {
        title: string;
    };
    sender_profile?: {
        full_name: string;
    };
    receiver_profile?: {
        full_name: string;
    };
}

export const transactionService = {
    async getUserTransactions(userId: string) {
        const { data, error } = await supabase
            .from('transactions')
            .select(`
                *,
                favors(title),
                sender_profile:profiles!transactions_sender_id_fkey(full_name),
                receiver_profile:profiles!transactions_receiver_id_fkey(full_name)
            `)
            .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Transaction[];
    },

    async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('transactions')
            .insert([transaction])
            .select()
            .single();

        if (error) throw error;
        return data as Transaction;
    }
};
