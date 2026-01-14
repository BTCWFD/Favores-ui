'use client';

import { useUser } from '@/context/UserContext';
import AchievementCard from './AchievementCard';

export default function ImpactDashboard() {
    const { user, peopleHelpedCount, favorsCompletedCount, karma, achievements } = useUser();

    if (!user) return null;

    // Static achievement examples if none exist
    const displayAchievements = achievements.length > 0 ? achievements : [
        { id: '1', title: 'Pionero', description: 'Uno de los primeros 500 miembros.', icon: '🚀', rarity: 'legendary' as const, unlockedAt: new Date().toISOString() },
        { id: '2', title: 'Héroe Local', description: 'Ayudaste a 5 personas.', icon: '🦸', rarity: 'rare' as const },
        { id: '3', title: 'Mente Curiosa', description: 'Publicaste tu primer favor.', icon: '💡', rarity: 'common' as const }
    ];

    return (
        <section id="impact-dashboard" className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-slate-100 pointer-events-none" />

            <div className="container mx-auto px-6 relative">
                <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-12">
                    <div className="max-w-xl animate-entrance">
                        <h2 className="text-5xl md:text-6xl font-display font-black text-slate-900 mb-6 leading-tight">
                            Tu Huella <br />
                            <span className="bg-gradient-to-r from-emerald-600 to-primary-600 bg-clip-text text-transparent">Social</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            En FAVORES, el éxito no se mide en billetes, sino en vidas impactadas y reputación construida. Aquí está tu legado hasta hoy.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 w-full md:w-auto animate-entrance [animation-delay:200ms]">
                        <div className="glass-card p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform">
                            <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">🤝</span>
                            <span className="text-4xl font-display font-black text-slate-800">{peopleHelpedCount}</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Vidas Impactadas</span>
                        </div>
                        <div className="glass-card p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform">
                            <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">📜</span>
                            <span className="text-4xl font-display font-black text-slate-800">{favorsCompletedCount}</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Misiones Épicas</span>
                        </div>
                    </div>
                </div>

                <div className="mb-20 animate-entrance [animation-delay:400ms]">
                    <h3 className="text-2xl font-display font-black text-slate-800 mb-10 flex items-center space-x-3">
                        <span>🏅</span>
                        <span>Medallas y Logros</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {displayAchievements.map(achievement => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group animate-entrance [animation-delay:600ms]">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/10 blur-[100px] rounded-full" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-display font-black mb-4">Análisis de Capital Social</h3>
                            <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                                Tu presencia en la red ha generado un valor equivalente a <span className="text-primary-400 font-black">{(peopleHelpedCount * 150) + karma} Karma Unidades</span>.
                                Eres una pieza fundamental del ecosistema.
                            </p>
                            <div className="flex space-x-4">
                                <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-500 w-[65%]" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-tighter">Nivel 4</span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-48 h-48 rounded-full border-8 border-slate-700 flex items-center justify-center relative">
                                <span className="text-5xl font-display font-black">{(karma / 10).toFixed(0)}%</span>
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle
                                        cx="96" cy="96" r="88"
                                        fill="none" stroke="#0ea5e9" strokeWidth="8"
                                        strokeDasharray="552" strokeDashoffset={552 - (552 * (karma / 1000))}
                                        className="transition-all duration-1000"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
