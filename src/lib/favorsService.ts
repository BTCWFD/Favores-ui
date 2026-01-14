import { supabase } from './supabase';

export interface Favor {
    id: string;
    creator_id: string;
    title: string;
    description: string;
    type: 'ask' | 'offer';
    category: string;
    karma_value: number;
    status: 'active' | 'in_progress' | 'completed' | 'verified';
    created_at: string;
    profiles?: {
        full_name: string;
        avatar_url: string;
    };
}

export const favorsService = {
    async getActiveFavors() {
        const { data, error } = await supabase
            .from('favors')
            .select('*, profiles(full_name, avatar_url)')
            .eq('status', 'active')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Favor[];
    },

    async createFavor(favor: Omit<Favor, 'id' | 'created_at' | 'status'>) {
        const { data, error } = await supabase
            .from('favors')
            .insert([{ ...favor, status: 'active' }])
            .select()
            .single();

        if (error) throw error;
        return data as Favor;
    },

    async updateFavorStatus(favorId: string, status: Favor['status']) {
        const { data, error } = await supabase
            .from('favors')
            .update({ status })
            .eq('id', favorId)
            .select()
            .single();

        if (error) throw error;
        return data as Favor;
    }
};
