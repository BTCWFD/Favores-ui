'use client';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function IdentityVerification({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { verifyUser, addKarma } = useUser();
    const [step, setStep] = useState(1);

    if (!isOpen) return null;

    const handleComplete = () => {
        verifyUser();
        addKarma(50); // Recompensa por verificación
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">✕</button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Verifica tu Identidad</h2>
                    <p className="text-gray-500">Construye confianza en la comunidad</p>
                </div>

                <div className="space-y-6">
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-primary-50 p-6 rounded-2xl mb-6 text-center">
                                <span className="text-4xl">🪪</span>
                                <p className="mt-4 text-gray-700">Sube una foto de tu documento de identidad</p>
                            </div>
                            <button onClick={() => setStep(2)} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition">Siguiente</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-accent-50 p-6 rounded-2xl mb-6 text-center">
                                <span className="text-4xl">📸</span>
                                <p className="mt-4 text-gray-700">Tómate una selfie para confirmar que eres tú</p>
                            </div>
                            <button onClick={() => setStep(3)} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition">Siguiente</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 text-center">
                            <div className="text-6xl mb-4">🎉</div>
                            <p className="text-gray-700 mb-6">¡Todo listo! Al verificar recibirás 50 Karma Tokens adicionales.</p>
                            <button onClick={handleComplete} className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-xl font-bold shadow-lg">Finalizar Verificación</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
