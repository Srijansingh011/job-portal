import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, []);

    return (
        <div className='min-h-screen bg-background'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-10'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className='mb-8'
                >
                    <div className='flex items-center gap-2 mb-1'>
                        <Search className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                        <span className='text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest'>Browse All</span>
                    </div>
                    <h1 className='text-3xl font-bold text-foreground'>
                        Search Results{' '}
                        <span className='text-xl font-semibold text-muted-foreground'>
                            ({allJobs.length})
                        </span>
                    </h1>
                </motion.div>

                {/* Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {allJobs.map((job, i) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                        >
                            <Job job={job} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Browse