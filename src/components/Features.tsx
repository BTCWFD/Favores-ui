'use client';

export default function Features() {
    return (
        <section id="como-funciona" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">¿Cómo Funciona?</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Tres simples pasos para comenzar a ayudar y ser ayudado
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100 hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6">1</div>
                        <h3 className="text-2xl font-bold mb-4">Crea tu Perfil</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Comparte tus habilidades y lo que necesitas. Verifica tu identidad para generar confianza.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-accent-50 to-white p-8 rounded-2xl border border-accent-100 hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6">2</div>
                        <h3 className="text-2xl font-bold mb-4">Conecta y Ayuda</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Nuestro algoritmo te conecta con personas cercanas que pueden ayudarte o necesitan tus habilidades.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100 hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6">3</div>
                        <h3 className="text-2xl font-bold mb-4">Construye Reputación</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Acumula Karma Tokens por cada favor completado. Desbloquea badges y gana visibilidad.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
