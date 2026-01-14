'use client';

export default function Footer() {
    return (
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
                        <p className="text-gray-400 text-sm">Construyendo comunidades más solidarias.</p>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p>© 2025 FAVORES. B-Corp en proceso.</p>
                </div>
            </div>
        </footer>
    );
}
