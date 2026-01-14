'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface UserContextType {
    user: User | null;
    karma: number;
    verificationStatus: 'none' | 'pending' | 'verified' | 'rejected';
    isVerified: boolean;
    loading: boolean;
    addKarma: (amount: number, favorId?: string) => Promise<void>;
    spendKarma: (amount: number, favorId?: string) => Promise<void>;
    requestVerification: () => Promise<void>;
    verifyUser: () => Promise<void>;
    signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [karma, setKarma] = useState(100);
    const [verificationStatus, setVerificationStatus] = useState<'none' | 'pending' | 'verified' | 'rejected'>('none');
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for active session
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setLoading(false);
            }
        };

        getInitialSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setKarma(100);
                setIsVerified(false);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('karma_balance, verification_status, is_verified')
                .eq('id', userId)
                .single();

            if (error) throw error;
            if (data) {
                setKarma(data.karma_balance);
                setVerificationStatus(data.verification_status || 'none');
                setIsVerified(data.is_verified || data.verification_status === 'verified');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const addKarma = async (amount: number, favorId?: string) => {
        if (!user) return;
        const newBalance = karma + amount;

        // Update profile balance
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ karma_balance: newBalance })
            .eq('id', user.id);

        if (profileError) {
            console.error('Error updating balance:', profileError);
            return;
        }

        // Record transaction
        await supabase.from('transactions').insert([{
            sender_id: null, // System / Minting
            receiver_id: user.id,
            amount: amount,
            favor_id: favorId || null
        }]);

        setKarma(newBalance);
    };

    const spendKarma = async (amount: number, favorId?: string) => {
        if (!user || karma < amount) return;
        const newBalance = karma - amount;

        // Update profile balance
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ karma_balance: newBalance })
            .eq('id', user.id);

        if (profileError) {
            console.error('Error updating balance:', profileError);
            return;
        }

        // Record transaction
        await supabase.from('transactions').insert([{
            sender_id: user.id,
            receiver_id: null, // System / Burn / Service Fee
            amount: amount,
            favor_id: favorId || null
        }]);

        setKarma(newBalance);
    };

    const requestVerification = async () => {
        if (!user) return;
        const { error } = await supabase
            .from('profiles')
            .update({ verification_status: 'pending' })
            .eq('id', user.id);

        if (!error) setVerificationStatus('pending');
    };

    const verifyUser = async () => {
        if (!user) return;
        const { error } = await supabase
            .from('profiles')
            .update({
                verification_status: 'verified',
                is_verified: true
            })
            .eq('id', user.id);

        if (!error) {
            setVerificationStatus('verified');
            setIsVerified(true);
            await addKarma(50); // ONLY reward on final verification
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <UserContext.Provider value={{ user, karma, verificationStatus, isVerified, loading, addKarma, spendKarma, requestVerification, verifyUser, signOut }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
