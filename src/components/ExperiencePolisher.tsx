'use client';
import { useEffect, useState } from 'react';

export default function ExperiencePolisher() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return null; // This component handles side effects and global styles/animations logic
}
