import { supabase } from './supabase';

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    created_at: string;
}

export interface Conversation {
    id: string;
    favor_id: string;
    participant_1_id: string;
    participant_2_id: string;
    created_at: string;
}

export const chatService = {
    async getOrCreateConversation(favorId: string, participant1: string, participant2: string): Promise<string> {
        // Try to find existing
        const { data: existing, error: findError } = await supabase
            .from('conversations')
            .select('id')
            .eq('favor_id', favorId)
            .or(`and(participant_1_id.eq.${participant1},participant_2_id.eq.${participant2}),and(participant_1_id.eq.${participant2},participant_2_id.eq.${participant1})`)
            .maybeSingle();

        if (existing) return existing.id;

        // Create new
        const { data: created, error: createError } = await supabase
            .from('conversations')
            .insert([{
                favor_id: favorId,
                participant_1_id: participant1,
                participant_2_id: participant2
            }])
            .select()
            .single();

        if (createError) throw createError;
        return created.id;
    },

    async getMessages(conversationId: string): Promise<Message[]> {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    async sendMessage(conversationId: string, senderId: string, content: string): Promise<void> {
        const { error } = await supabase
            .from('messages')
            .insert([{
                conversation_id: conversationId,
                sender_id: senderId,
                content: content
            }]);

        if (error) throw error;
    },

    subscribeToMessages(conversationId: string, onNewMessage: (message: Message) => void) {
        return supabase
            .channel(`chat:${conversationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversation_id=eq.${conversationId}`
                },
                (payload) => {
                    onNewMessage(payload.new as Message);
                }
            )
            .subscribe();
    }
};
