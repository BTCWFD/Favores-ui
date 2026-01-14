'use client';
import { useUser } from '@/context/UserContext';

export default function KarmaBadge() {
    const { karma } = useUser();
    return (
        <div className="group relative flex items-center space-x-2 bg-gradient-to-tr from-yellow-400 via-orange-500 to-amber-600 p-[1px] rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-transform">
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-[15px] group-hover:bg-white/70 transition-colors">
                <span className="text-lg">✨</span>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-orange-600 leading-none uppercase tracking-tighter">Tu Karma</span>
                    <span className="text-sm font-display font-black text-slate-800 leading-none mt-0.5">{karma}</span>
                </div>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity pointer-events-none" />
        </div>
    );
}
