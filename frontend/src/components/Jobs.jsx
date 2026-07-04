import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) =>
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            );
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='min-h-screen bg-background'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className='mb-6'
                >
                    <h1 className='text-3xl font-bold text-foreground'>
                        Find Your <span className='gradient-text'>Perfect Job</span>
                    </h1>
                    <p className='text-muted-foreground text-sm mt-1'>
                        {filterJobs.length} opportunit{filterJobs.length !== 1 ? 'ies' : 'y'} available
                    </p>
                </motion.div>

                <div className='flex gap-6'>
                    {/* Filter Sidebar */}
                    <div className='w-64 flex-shrink-0'>
                        <FilterCard />
                    </div>

                    {/* Job Grid */}
                    <div className='flex-1'>
                        {filterJobs.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className='flex flex-col items-center justify-center py-24 text-center'
                            >
                                <div className='w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4'>
                                    <Briefcase className='w-8 h-8 text-purple-400' />
                                </div>
                                <h3 className='text-lg font-semibold text-foreground'>No jobs found</h3>
                                <p className='text-muted-foreground text-sm mt-1'>Try adjusting your filters</p>
                            </motion.div>
                        ) : (
                            <div className='h-[85vh] overflow-y-auto pr-2 scrollbar-thin'>
                                <AnimatePresence>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                                        {filterJobs.map((job, i) => (
                                            <motion.div
                                                key={job?._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs