import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className='py-20 bg-gray-50/50 dark:bg-[#0a0a1a]'>
            <div className='max-w-7xl mx-auto px-4'>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='flex items-center justify-between mb-10'
                >
                    <div>
                        <div className='flex items-center gap-2 mb-2'>
                            <TrendingUp className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                            <span className='text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest'>
                                Hot Opportunities
                            </span>
                        </div>
                        <h2 className='text-4xl font-bold text-foreground'>
                            <span className='gradient-text'>Latest & Top</span> Job Openings
                        </h2>
                    </div>
                </motion.div>

                {/* Jobs Grid */}
                {allJobs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='flex flex-col items-center justify-center py-20 text-center'
                    >
                        <div className='w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4'>
                            <TrendingUp className='w-8 h-8 text-purple-400' />
                        </div>
                        <p className='text-muted-foreground text-lg'>No jobs available right now.</p>
                        <p className='text-muted-foreground text-sm mt-1'>Check back soon for new opportunities!</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                    >
                        {allJobs.slice(0, 6).map((job) => (
                            <motion.div key={job._id} variants={cardVariants}>
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    )
}

export default LatestJobs