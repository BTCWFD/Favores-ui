'use client';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import KarmaBadge from './KarmaBadge';
import IdentityVerification from './IdentityVerification';

export default function Header() {
    const { isVerified } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <header className="container mx-auto px-4 py-4 sm:py-6">
            <nav className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg sm:text-xl">F</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent hidden xs:block">
                        FAVORES
                    </span>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-8">
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#como-funciona" className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">
                            Cómo Funciona
                        </a>
                        <a href="#impacto" className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">
                            Impacto
                        </a>
                    </div>
                    <KarmaBadge />
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    {!isVerified && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="hidden sm:block text-primary-600 font-semibold hover:underline text-xs sm:text-sm"
                        >
                            Verificar
                        </button>
                    )}
                    {isVerified && (
                        <span className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-green-200">
                            ✓ <span className="hidden sm:inline">Verificado</span>
                        </span>
                    )}
                    <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm hover:shadow-lg transition-all duration-300">
                        Perfil
                    </button>
                </div>
            </nav>

            <IdentityVerification isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </header>
    );
}
