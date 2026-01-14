'use client';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function IdentityVerification({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { verifyUser, addKarma } = useUser();
    const [step, setStep] = useState(1);

    if (!isOpen) return null;

    const handleComplete = () => {
        verifyUser();
        addKarma(50);
        onClose();
    };

    const totalSteps = 3;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
            {/* Modal / Bottom Sheet Container */}
            <div className="bg-white w-full max-w-md sm:rounded-3xl rounded-t-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom sm:zoom-in duration-300">

                {/* Drag Handle for Mobile */}
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div>

                <button onClick={onClose} className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-400 hover:text-gray-600 p-2">
                    ✕
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Verifica tu Identidad</h2>
                    <p className="text-sm text-gray-500 mt-1">Gana confianza y 50 Karma Tokens</p>
                </div>

                {/* Progress Stepper */}
                <div className="flex justify-center space-x-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`h-1.5 rounded-full transition-all duration-300 ${s <= step ? 'w-8 bg-primary-600' : 'w-4 bg-gray-200'
                                }`}
                        />
                    ))}
                </div>

                <div className="min-h-[220px] flex flex-col justify-center">
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-primary-50 p-6 rounded-2xl mb-6 text-center">
                                <span className="text-4xl">🪪</span>
                                <p className="mt-4 text-sm sm:text-base text-gray-700 font-medium">Sube una foto de tu documento de identidad</p>
                            </div>
                            <button onClick={() => setStep(2)} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95">Siguiente</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-accent-50 p-6 rounded-2xl mb-6 text-center">
                                <span className="text-4xl">📸</span>
                                <p className="mt-4 text-sm sm:text-base text-gray-700 font-medium">Tómate una selfie para confirmar tu cuenta</p>
                            </div>
                            <button onClick={() => setStep(3)} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95">Siguiente</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in zoom-in duration-300 text-center">
                            <div className="text-6xl mb-4 animate-bounce">🎉</div>
                            <p className="text-gray-700 mb-6 font-medium px-4">¡Todo listo! Recibirás tus Karma Tokens al instante.</p>
                            <button onClick={handleComplete} className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-xl font-bold shadow-xl active:scale-95 transition-transform">Finalizar</button>
                        </div>
                    )}
                </div>

                <p className="text-[10px] text-center text-gray-400 mt-6 uppercase tracking-widest">
                    Paso {step} de {totalSteps}
                </p>
            </div>
        </div>
    );
}
