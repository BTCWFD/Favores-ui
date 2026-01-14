'use client';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import KarmaBadge from './KarmaBadge';
import IdentityVerification from './IdentityVerification';
import ProfileModal from './ProfileModal';

export default function Header() {
    const { isVerified } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="glass-nav py-6">
            <div className="container mx-auto px-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-shrink-0 group cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:rotate-6 transition-transform">
                            <span className="text-white font-display font-black text-2xl">F</span>
                        </div>
                        <span className="text-2xl font-display font-black tracking-tighter bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent hidden sm:block">
                            FAVORES
                        </span>
                    </div>

                    <div className="flex items-center space-x-12">
                        <div className="hidden lg:flex items-center space-x-10">
                            <a href="#marketplace" className="text-slate-500 hover:text-primary-600 transition-colors text-xs font-black uppercase tracking-widest">
                                Marketplace
                            </a>
                            <a href="#como-funciona" className="text-slate-500 hover:text-primary-600 transition-colors text-xs font-black uppercase tracking-widest">
                                Protocolo
                            </a>
                            <a href="#impacto" className="text-slate-500 hover:text-primary-600 transition-colors text-xs font-black uppercase tracking-widest">
                                Impacto
                            </a>
                        </div>
                        <KarmaBadge />
                    </div>

                    <div className="flex items-center space-x-6">
                        {!isVerified && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="hidden sm:block text-slate-400 hover:text-primary-600 font-black uppercase tracking-widest text-[10px] transition-colors"
                            >
                                Verificar Cuenta
                            </button>
                        )}
                        {isVerified && (
                            <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border border-emerald-100 hidden md:block">
                                ✓ VERIFICADO
                            </span>
                        )}
                        <button
                            onClick={() => setIsProfileOpen(true)}
                            className="btn-premium px-8 py-2.5 rounded-xl text-xs uppercase tracking-widest shadow-xl"
                        >
                            Dashboard
                        </button>
                    </div>
                </nav>
            </div>

            <IdentityVerification isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </header>
    );
}
