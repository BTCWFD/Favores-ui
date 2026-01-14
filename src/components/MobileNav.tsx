'use client';
import { useUser } from '@/context/UserContext';

export default function MobileNav() {
    const { user } = useUser();

    if (!user) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
            <div className="bg-white/80 backdrop-blur-xl border-t border-white/50 flex items-center justify-around py-3 px-6 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
                <a href="#marketplace" className="flex flex-col items-center space-y-1 text-primary-600">
                    <span className="text-xl">🤝</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Market</span>
                </a>
                <div className="w-14 h-14 bg-gradient-to-tr from-primary-600 to-accent-600 rounded-full flex items-center justify-center -mt-10 shadow-lg shadow-primary-500/40 border-4 border-white">
                    <span className="text-2xl text-white">✨</span>
                </div>
                <a href="#ledger" className="flex flex-col items-center space-y-1 text-gray-400">
                    <span className="text-xl">📖</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Libro</span>
                </a>
            </div>
        </div>
    );
}
