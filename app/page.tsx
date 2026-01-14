'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marketplace from '@/components/Marketplace';
import TransactionLedger from '@/components/TransactionLedger';
import Features from '@/components/Features';
import ImpactDashboard from '@/components/ImpactDashboard';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <Hero />
            <Marketplace />
            <ImpactDashboard />
            <TransactionLedger />
            <Features />
            <Community />
            <Footer />
        </div>
    );
}
