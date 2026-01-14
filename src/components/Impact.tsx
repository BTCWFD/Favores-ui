'use client';

export default function Impact() {
    return (
        <section id="impacto" className="bg-gradient-to-br from-primary-600 to-accent-600 text-white py-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Impacto Social Medible</h2>
                        <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                            FAVORES no es solo una plataforma, es un movimiento que busca construir comunidades más resilientes y solidarias.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Reduce Costos de Vida</h3>
                                    <p className="text-primary-100">Ahorra en servicios cotidianos mientras ayudas a otros</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Fortalece Comunidades</h3>
                                    <p className="text-primary-100">Crea lazos reales con tus vecinos y comunidad local</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold mb-6">Nuestro Compromiso</h3>
                        <div className="space-y-4">
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">40%</div>
                                <div className="text-primary-100 text-sm">de familias latinoamericanas no pueden pagar servicios básicos</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">100%</div>
                                <div className="text-primary-100 text-sm">Sin costos para intercambiar favores</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
