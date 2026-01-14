import { supabase } from './supabase';

export const verificationService = {
    async uploadDocument(userId: string, file: File, type: 'id_card' | 'selfie') {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}/${type}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
            .from('verification')
            .upload(filePath, file);

        if (error) throw error;

        // Optionally, register the upload in a table (e.g., verification_docs)
        // For now, we return the path
        return data.path;
    },

    async submitForVerification(userId: string, idPath: string, selfiePath: string) {
        // Here we could update the profile to 'pending_verification' 
        // and link the paths in a separate table if needed.
        const { error } = await supabase
            .from('profiles')
            .update({
                is_verified: false, // Explicitly false while pending
                // In a real system, you'd store idPath and selfiePath in a 'verification_requests' table
            })
            .eq('id', userId);

        if (error) throw error;
        return true;
    }
};
