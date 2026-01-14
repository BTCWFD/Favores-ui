'use client';

export default function Community() {
    return (
        <section id="comunidad" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Únete a la Comunidad</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Miles de personas ya están construyendo un futuro más colaborativo
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Simplified for brevity */}
                    <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-2xl border border-primary-100">
                        <div className="font-semibold mb-2">María González</div>
                        <p className="text-gray-700 italic">&quot;Encontré ayuda para mi PC sin dinero. ¡Ahora doy tutorías!&quot;</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-12 text-center text-white">
                    <h3 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h3>
                    <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        Solicitar Acceso Beta
                    </button>
                </div>
            </div>
        </section>
    );
}
