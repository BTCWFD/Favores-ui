'use client';

import { useState } from 'react';

export default function HomePage() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`¡Gracias! Te contactaremos pronto a: ${email}`);
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">F</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                            FAVORES
                        </span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a href="#como-funciona" className="text-gray-600 hover:text-primary-600 transition-colors">
                            Cómo Funciona
                        </a>
                        <a href="#impacto" className="text-gray-600 hover:text-primary-600 transition-colors">
                            Impacto
                        </a>
                        <a href="#comunidad" className="text-gray-600 hover:text-primary-600 transition-colors">
                            Comunidad
                        </a>
                    </div>
                    <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                        Unirse Ahora
                    </button>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 md:py-32">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            🌍 Economía Colaborativa • Sin Dinero
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Ayuda y recibe ayuda{' '}
                            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                                sin dinero
                            </span>{' '}
                            de por medio
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Intercambia habilidades, tiempo y conocimiento con tu comunidad.
                            Construye reputación verificable mientras resuelves tus necesidades cotidianas.
                        </p>

                        {/* Email Signup */}
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                                className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                Acceso Anticipado
                            </button>
                        </form>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <div className="text-3xl font-bold text-primary-600">500+</div>
                                <div className="text-sm text-gray-500">Usuarios Beta</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600">1K+</div>
                                <div className="text-sm text-gray-500">Favores Completados</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600">$30K</div>
                                <div className="text-sm text-gray-500">Valor Generado</div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image Placeholder */}
                    <div className="relative">
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

                        {/* Floating badge */}
                        <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                            <div className="text-4xl mb-1">🤝</div>
                            <div className="text-xs font-semibold text-gray-700">Comunidad</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="como-funciona" className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">¿Cómo Funciona?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Tres simples pasos para comenzar a ayudar y ser ayudado
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6">
                                1
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Crea tu Perfil</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Comparte tus habilidades y lo que necesitas. Verifica tu identidad
                                para generar confianza en la comunidad.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-gradient-to-br from-accent-50 to-white p-8 rounded-2xl border border-accent-100 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6">
                                2
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Conecta y Ayuda</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Nuestro algoritmo te conecta con personas cercanas que pueden ayudarte
                                o necesitan tus habilidades.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6">
                                3
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Construye Reputación</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Acumula Karma Tokens por cada favor completado. Desbloquea badges
                                y gana visibilidad en la comunidad.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section id="impacto" className="bg-gradient-to-br from-primary-600 to-accent-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Impacto Social Medible</h2>
                            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                                FAVORES no es solo una plataforma, es un movimiento que busca
                                construir comunidades más resilientes y solidarias.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">💰</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Reduce Costos de Vida</h3>
                                        <p className="text-primary-100">
                                            Ahorra en servicios cotidianos mientras ayudas a otros
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">🤝</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Fortalece Comunidades</h3>
                                        <p className="text-primary-100">
                                            Crea lazos reales con tus vecinos y comunidad local
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">📚</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Desarrolla Habilidades</h3>
                                        <p className="text-primary-100">
                                            Aprende nuevas skills de forma gratuita y colaborativa
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                            <h3 className="text-2xl font-bold mb-6">Nuestro Compromiso</h3>
                            <div className="space-y-4">
                                <div className="bg-white/10 rounded-xl p-4">
                                    <div className="text-3xl font-bold mb-1">40%</div>
                                    <div className="text-primary-100 text-sm">
                                        de familias latinoamericanas no pueden pagar servicios básicos
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4">
                                    <div className="text-3xl font-bold mb-1">100%</div>
                                    <div className="text-primary-100 text-sm">
                                        Sin costos para intercambiar favores
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4">
                                    <div className="text-3xl font-bold mb-1">B-Corp</div>
                                    <div className="text-primary-100 text-sm">
                                        Certificación de impacto social en proceso
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section id="comunidad" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Únete a la Comunidad</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Miles de personas ya están construyendo un futuro más colaborativo
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {/* Testimonial 1 */}
                        <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-2xl border border-primary-100">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full"></div>
                                <div>
                                    <div className="font-semibold">María González</div>
                                    <div className="text-sm text-gray-500">Medellín, Colombia</div>
                                </div>
                            </div>
                            <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
                            <p className="text-gray-700 italic">
                                &quot;Encontré ayuda para reparar mi computadora sin gastar dinero.
                                ¡Ahora yo ayudo con tutorías de inglés!&quot;
                            </p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-gradient-to-br from-accent-50 to-white p-6 rounded-2xl border border-accent-100">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full"></div>
                                <div>
                                    <div className="font-semibold">Carlos Ruiz</div>
                                    <div className="text-sm text-gray-500">Cali, Colombia</div>
                                </div>
                            </div>
                            <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
                            <p className="text-gray-700 italic">
                                &quot;Como freelancer, intercambio diseño por servicios que necesito.
                                La comunidad es increíble.&quot;
                            </p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-2xl border border-primary-100">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full"></div>
                                <div>
                                    <div className="font-semibold">Ana Morales</div>
                                    <div className="text-sm text-gray-500">Estudiante, EAFIT</div>
                                </div>
                            </div>
                            <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
                            <p className="text-gray-700 italic">
                                &quot;He aprendido habilidades que me servirán en mi carrera,
                                mientras ayudo con mis conocimientos de matemáticas.&quot;
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-12 text-center text-white">
                        <h3 className="text-3xl font-bold mb-4">
                            ¿Listo para comenzar?
                        </h3>
                        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                            Únete al piloto en Medellín y sé parte del primer ecosistema
                            de economía colaborativa en América Latina
                        </p>
                        <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            Solicitar Acceso Beta
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">F</span>
                                </div>
                                <span className="text-xl font-bold">FAVORES</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Construyendo comunidades más solidarias, un favor a la vez.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Producto</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Cómo Funciona</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Para Empresas</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Compañía</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Impacto Social</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Seguridad</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        <p>© 2025 FAVORES. Todos los derechos reservados. B-Corp en proceso.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
