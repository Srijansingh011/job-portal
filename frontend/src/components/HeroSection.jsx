import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const stats = [
    { value: "10K+", label: "Jobs Posted" },
    { value: "5K+", label: "Companies" },
    { value: "50K+", label: "Job Seekers" },
]

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') searchJobHandler();
    }

    return (
        <section className='relative overflow-hidden min-h-[90vh] flex items-center'>
            {/* Dark gradient background */}
            <div className='absolute inset-0 hero-gradient opacity-100 dark:opacity-100' />

            {/* Animated blobs */}
            <div className='absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl animate-blob' />
            <div className='absolute bottom-20 right-10 w-96 h-96 rounded-full bg-violet-700/20 blur-3xl animate-blob' style={{ animationDelay: '3s' }} />
            <div className='absolute top-40 right-1/3 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl animate-blob' style={{ animationDelay: '6s' }} />

            {/* Dot grid overlay */}
            <div
                className='absolute inset-0 opacity-20'
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.4) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Content */}
            <div className='relative z-10 w-full max-w-5xl mx-auto px-4 py-20 text-center'>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 animate-float'
                >
                    <Sparkles className='w-4 h-4 text-violet-300' />
                    No. 1 Job Hunt Website
                    <Sparkles className='w-4 h-4 text-violet-300' />
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className='text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6'
                >
                    Search, Apply &{' '}
                    <br />
                    Get Your{' '}
                    <span
                        className='inline-block'
                        style={{
                            background: 'linear-gradient(135deg, #a78bfa, #f472b6, #fb923c)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Dream Job
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed'
                >
                    Discover thousands of opportunities from top companies. Your next career move starts here.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={`flex w-full max-w-2xl mx-auto rounded-2xl overflow-hidden transition-all duration-300 ${
                        focused
                            ? 'shadow-2xl shadow-purple-500/40 ring-2 ring-purple-400'
                            : 'shadow-xl shadow-black/30'
                    }`}
                >
                    <div className='flex items-center flex-1 bg-white dark:bg-[#13132a] px-5 py-1'>
                        <Search className='w-5 h-5 text-purple-400 mr-3 flex-shrink-0' />
                        <input
                            type="text"
                            placeholder='Find your dream job — e.g. React Developer...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            onKeyDown={handleKeyDown}
                            className='flex-1 bg-transparent outline-none border-none text-foreground placeholder:text-muted-foreground text-sm py-4'
                        />
                    </div>
                    <Button
                        onClick={searchJobHandler}
                        className='brand-gradient text-white px-8 py-6 text-sm font-semibold rounded-none hover:opacity-90 transition-opacity h-auto'
                    >
                        Search Jobs
                    </Button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className='flex items-center justify-center gap-12 mt-14'
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className='text-center'
                        >
                            <div className='text-3xl font-bold text-white'>{stat.value}</div>
                            <div className='text-white/50 text-sm mt-1'>{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection