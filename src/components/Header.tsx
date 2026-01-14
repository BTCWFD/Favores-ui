'use client';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import KarmaBadge from './KarmaBadge';
import IdentityVerification from './IdentityVerification';

export default function Header() {
    const { isVerified } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <header className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl">F</span>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        FAVORES
                    </span>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <a href="#como-funciona" className="text-gray-600 hover:text-primary-600 transition-colors">
                        Cómo Funciona
                    </a>
                    <a href="#impacto" className="text-gray-600 hover:text-primary-600 transition-colors">
                        Impacto
                    </a>
                    <KarmaBadge />
                </div>

                <div className="flex items-center space-x-4">
                    {!isVerified && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-primary-600 font-semibold hover:underline text-sm"
                        >
                            Verificar Cuenta
                        </button>
                    )}
                    {isVerified && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                            ✓ Verificado
                        </span>
                    )}
                    <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                        Perfil
                    </button>
                </div>
            </nav>

            <IdentityVerification isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </header>
    );
}
