'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marketplace from '@/components/Marketplace';
import TransactionLedger from '@/components/TransactionLedger';
import Features from '@/components/Features';
import Impact from '@/components/Impact';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
            <Header />
            <Hero />
            <Marketplace />
            <TransactionLedger />
            <Features />
            <Impact />
            <Community />
            <Footer />
        </div>
    );
}
