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
        <section className="container mx-auto px-4 py-12 md:py-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium mb-4 sm:mb-6">
                        🌍 Economía Colaborativa • Sin Dinero
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                        Ayuda y recibe ayuda{' '}
                        <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                            sin dinero
                        </span>{' '}
                        de por medio
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                        Intercambia habilidades, tiempo y conocimiento con tu comunidad.
                        Construye reputación verificable mientras resuelves tus necesidades cotidianas.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                            className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-sm sm:text-base"
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-sm sm:text-base"
                        >
                            Acceso Anticipado
                        </button>
                    </form>

                    <div className="grid grid-cols-3 gap-3 sm:gap-6">
                        <div>
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-600">500+</div>
                            <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 uppercase tracking-wider">Usuarios</div>
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-600">1K+</div>
                            <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 uppercase tracking-wider">Favores</div>
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-600">$30K</div>
                            <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 uppercase tracking-wider">Valor</div>
                        </div>
                    </div>
                </div>

                <div className="relative hidden md:block">
                    <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl p-8 shadow-2xl">
                        <div className="bg-white rounded-2xl p-6 mb-4 shadow-lg transform hover:scale-105 transition-transform">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full"></div>
                                <div>
                                    <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
                                    <div className="h-2 bg-gray-100 rounded w-24"></div>
                                </div>
                            </div>
                            <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full"></div>
                                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                                </div>
                                <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                                    ⭐ 4.9
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 bg-gray-100 rounded w-full"></div>
                                <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
