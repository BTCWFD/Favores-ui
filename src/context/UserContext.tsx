'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
    karma: number;
    isVerified: boolean;
    addKarma: (amount: number) => void;
    spendKarma: (amount: number) => void;
    verifyUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [karma, setKarma] = useState(100);
    const [isVerified, setIsVerified] = useState(false);

    const addKarma = (amount: number) => setKarma((prev) => prev + amount);
    const spendKarma = (amount: number) => setKarma((prev) => (prev >= amount ? prev - amount : prev));
    const verifyUser = () => setIsVerified(true);

    return (
        <UserContext.Provider value={{ karma, isVerified, addKarma, spendKarma, verifyUser }}>
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
