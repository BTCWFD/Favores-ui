'use client';
import { useUser } from '@/context/UserContext';

export default function KarmaBadge() {
    const { karma } = useUser();
    return (
        <div className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm animate-pulse whitespace-nowrap">
            <span>✨</span>
            <span>{karma} <span className="hidden xs:inline">KARMA</span></span>
        </div>
    );
}
