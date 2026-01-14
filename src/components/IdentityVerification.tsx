'use client';
import { useState, useRef } from 'react';
import { useUser } from '@/context/UserContext';
import { verificationService } from '@/lib/verificationService';

export default function IdentityVerification({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { user, requestVerification, verificationStatus } = useUser();
    const [step, setStep] = useState(0); // Starts at 0 for Legal Consent
    const [loading, setLoading] = useState(false);
    const [consent, setConsent] = useState(false);
    const [files, setFiles] = useState<{ id_card: File | null; selfie: File | null }>({
        id_card: null,
        selfie: null
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'id_card' | 'selfie') => {
        const file = e.target.files?.[0];
        if (file) {
            setFiles(prev => ({ ...prev, [type]: file }));
        }
    };

    const handleUploadAndNext = async (type: 'id_card' | 'selfie') => {
        if (!user || !files[type]) return;

        setLoading(true);
        try {
            await verificationService.uploadDocument(user.id, files[type]!, type);
            setStep(step + 1);
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Error al subir el archivo. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        setLoading(true);
        try {
            // Legal: Transition to 'pending' instead of instant 'verified'
            await requestVerification();
            onClose();
        } catch (error) {
            console.error('Error completing verification:', error);
        } finally {
            setLoading(false);
        }
    };

    const totalSteps = 3;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white w-full max-w-md sm:rounded-3xl rounded-t-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom sm:zoom-in duration-300">

                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div>

                <button onClick={onClose} className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-400 hover:text-gray-600 p-2">
                    ✕
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Verifica tu Identidad</h2>
                    <p className="text-sm text-gray-500 mt-1">Gana confianza y 50 Karma Tokens</p>
                </div>

                {step > 0 && (
                    <div className="flex justify-center space-x-2 mb-8">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-1.5 rounded-full transition-all duration-300 ${s <= step ? 'w-8 bg-primary-600' : 'w-4 bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                <div className="min-h-[280px] flex flex-col justify-center">
                    {step === 0 && (
                        <div className="animate-in fade-in duration-300">
                            <div className="bg-gray-50 p-5 rounded-2xl mb-6 text-xs text-gray-600 space-y-3 border border-gray-100 max-h-[200px] overflow-y-auto">
                                <p className="font-bold text-gray-800">Consentimiento de Privacidad (Legal Compliance)</p>
                                <p>Al continuar, autorizas a **FAVORES** a tratar tus datos biométricos y personales bajo los estándares de GDPR/LATAM.</p>
                                <p>Tus documentos se eliminarán automáticamente tras la validación.</p>
                                <p>El Karma entregado es un crédito social sin valor monetario y no es reembolsable.</p>
                            </div>
                            <label className="flex items-center space-x-3 mb-6 p-2 cursor-pointer hover:bg-primary-50 rounded-xl transition-colors">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                />
                                <span className="text-sm text-gray-700">He leído y acepto los términos de verificación.</span>
                            </label>
                            <button
                                onClick={() => setStep(1)}
                                disabled={!consent}
                                className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                            >
                                Iniciar Verificación
                            </button>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-primary-50 p-6 rounded-2xl mb-6 text-center border-2 border-dashed border-primary-200">
                                <span className="text-4xl">🪪</span>
                                <p className="mt-4 text-sm sm:text-base text-gray-700 font-medium">
                                    {files.id_card ? `Seleccionado: ${files.id_card.name}` : 'Sube una foto de tu documento de identidad'}
                                </p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="id-upload"
                                    onChange={(e) => handleFileChange(e, 'id_card')}
                                />
                                <label htmlFor="id-upload" className="mt-4 inline-block text-primary-600 font-bold text-sm cursor-pointer hover:underline">
                                    {files.id_card ? 'Cambiar archivo' : 'Seleccionar archivo'}
                                </label>
                            </div>
                            <button
                                onClick={() => handleUploadAndNext('id_card')}
                                disabled={!files.id_card || loading}
                                className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                            >
                                {loading ? 'Subiendo...' : 'Continuar'}
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-accent-50 p-6 rounded-2xl mb-6 text-center border-2 border-dashed border-accent-200">
                                <span className="text-4xl">📸</span>
                                <p className="mt-4 text-sm sm:text-base text-gray-700 font-medium">
                                    {files.selfie ? `Seleccionado: ${files.selfie.name}` : 'Tómate una selfie para confirmar tu cuenta'}
                                </p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="selfie-upload"
                                    capture="user"
                                    onChange={(e) => handleFileChange(e, 'selfie')}
                                />
                                <label htmlFor="selfie-upload" className="mt-4 inline-block text-accent-600 font-bold text-sm cursor-pointer hover:underline">
                                    {files.selfie ? 'Cambiar selfie' : 'Abrir cámara'}
                                </label>
                            </div>
                            <button
                                onClick={() => handleUploadAndNext('selfie')}
                                disabled={!files.selfie || loading}
                                className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                            >
                                {loading ? 'Subiendo...' : 'Continuar'}
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in zoom-in duration-300 text-center">
                            <div className="text-6xl mb-4">⌛</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Solicitud Enviada</h3>
                            <p className="text-gray-600 mb-6 font-medium px-4">Hemos recibido tus documentos. Nuestro equipo de compliance los revisará en las próximas 24h.</p>
                            <button
                                onClick={handleComplete}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-xl font-bold shadow-xl active:scale-95 transition-transform"
                            >
                                {loading ? 'Enviando...' : 'Entendido'}
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-[10px] text-center text-gray-400 mt-6 uppercase tracking-widest">
                    Paso {step === 0 ? 'Consentimiento' : `${step} de ${totalSteps}`}
                </p>
            </div>
        </div>
    );
}
