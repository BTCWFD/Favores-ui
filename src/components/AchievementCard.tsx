'use client';

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedAt?: string;
}

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
    const rarityStyles = {
        common: 'from-slate-100 to-slate-200 border-slate-200 text-slate-600',
        rare: 'from-blue-100 to-blue-200 border-blue-300 text-blue-700',
        epic: 'from-purple-100 to-purple-200 border-purple-300 text-purple-700',
        legendary: 'from-amber-100 via-yellow-200 to-orange-200 border-amber-300 text-amber-800'
    };

    return (
        <div className={`relative overflow-hidden p-6 rounded-[2rem] border-2 bg-gradient-to-br transition-all duration-500 hover:scale-[1.05] hover:shadow-xl ${rarityStyles[achievement.rarity]}`}>
            <div className="flex flex-col items-center text-center">
                <div className="text-5xl mb-4 animate-float">
                    {achievement.icon}
                </div>
                <h4 className="font-display font-black text-lg mb-1">{achievement.title}</h4>
                <p className="text-xs font-medium opacity-80">{achievement.description}</p>

                {achievement.unlockedAt && (
                    <div className="mt-4 px-3 py-1 bg-white/40 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                        Desbloqueado
                    </div>
                )}
            </div>

            {/* Gloss shine effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 -skew-y-12 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
        </div>
    );
}
