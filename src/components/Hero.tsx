'use client';
import { useState } from 'react';

export default function Hero() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`¡Gracias! Te contactaremos pronto a: ${email}`);
        setEmail('');
    };

    return (
        <section className="container mx-auto px-4 py-16 md:py-32 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200/20 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-200/20 blur-[100px] rounded-full -z-10" />

            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="animate-entrance">
                    <div className="inline-flex items-center space-x-2 bg-primary-100/50 backdrop-blur-sm text-primary-800 px-4 py-2 rounded-full text-xs font-bold mb-8 border border-primary-200/50">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        <span className="tracking-widest uppercase">Ecosistema Solidario V1.0</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black mb-8 leading-[1.1] tracking-tight text-slate-900">
                        Construye tu <br />
                        <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">
                            Reputación Social
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-xl font-medium">
                        La primera plataforma de intercambio donde tu tiempo y habilidades son la única moneda válida. Ayuda a otros, acumula Karma y resuelve tus necesidades sin dinero.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-12 p-2 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-xl">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                            className="flex-1 px-6 py-4 bg-transparent focus:outline-none text-slate-700 font-medium"
                        />
                        <button
                            type="submit"
                            className="btn-premium px-10 py-4 rounded-2xl whitespace-nowrap shadow-xl"
                        >
                            Unirse a la Red
                        </button>
                    </form>

                    <div className="grid grid-cols-3 gap-8 border-t border-slate-100 pt-10">
                        <div className="group cursor-default">
                            <div className="text-3xl font-display font-black text-slate-800 group-hover:text-primary-600 transition-colors">500+</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pioneros</div>
                        </div>
                        <div className="group cursor-default">
                            <div className="text-3xl font-display font-black text-slate-800 group-hover:text-primary-600 transition-colors">1.2K</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Misiones</div>
                        </div>
                        <div className="group cursor-default">
                            <div className="text-3xl font-display font-black text-slate-800 group-hover:text-primary-600 transition-colors">∞</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Impacto</div>
                        </div>
                    </div>
                </div>

                <div className="relative hidden md:block animate-entrance [animation-delay:200ms]">
                    <div className="animate-float">
                        <div className="bg-gradient-to-br from-primary-600/10 to-accent-600/10 rounded-[3rem] p-4 backdrop-blur-3xl border border-white/50 shadow-2xl">
                            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 mb-6 shadow-xl border border-white/50 transform hover:scale-105 transition-all duration-500">
                                <div className="flex items-center space-x-5 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-accent-500 rounded-3xl shadow-lg rotate-3"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-slate-100 rounded-full w-40 mb-3"></div>
                                        <div className="h-3 bg-slate-50 rounded-full w-24"></div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-3 bg-slate-50 rounded-full w-full"></div>
                                    <div className="h-3 bg-slate-50 rounded-full w-5/6"></div>
                                </div>
                            </div>

                            <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl border border-white/50 transform -rotate-2 hover:rotate-0 transition-all duration-500 ml-12">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-accent-100 rounded-2xl flex items-center justify-center text-accent-600 font-bold text-xl uppercase">K</div>
                                        <div className="h-4 bg-slate-100 rounded-full w-32"></div>
                                    </div>
                                    <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-black border border-emerald-100">
                                        +50 KARMA
                                    </div>
                                </div>
                                <div className="h-3 bg-slate-50 rounded-full w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
