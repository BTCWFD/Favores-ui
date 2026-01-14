'use client';
import { useUser } from '@/context/UserContext';

export default function KarmaBadge() {
    const { karma } = useUser();
    return (
        <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-pulse">
            <span>✨</span>
            <span>{karma} KARMA</span>
        </div>
    );
}
