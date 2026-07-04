import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Building2 } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => navigate(`/description/${job._id}`)}
            className='group p-6 rounded-2xl bg-white dark:bg-[#13132a] border border-gray-100 dark:border-purple-900/30 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer transition-all duration-300'
        >
            {/* Company Info */}
            <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 flex items-center justify-center'>
                    <Building2 className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                </div>
                <div>
                    <h1 className='font-semibold text-foreground text-sm'>{job?.company?.name}</h1>
                    <div className='flex items-center gap-1 text-muted-foreground text-xs mt-0.5'>
                        <MapPin className='w-3 h-3' />
                        <span>India</span>
                    </div>
                </div>
            </div>

            {/* Job Title & Description */}
            <div className='mb-4'>
                <h1 className='font-bold text-base text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1'>
                    {job?.title}
                </h1>
                <p className='text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed'>
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className='flex items-center gap-2 flex-wrap'>
                <Badge className='bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 text-xs font-semibold px-2.5 py-1'>
                    {job?.position} Position{job?.position !== 1 ? 's' : ''}
                </Badge>
                <Badge className='bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 text-xs font-semibold px-2.5 py-1'>
                    {job?.jobType}
                </Badge>
                <Badge className='bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 text-xs font-semibold px-2.5 py-1'>
                    ₹{job?.salary} LPA
                </Badge>
            </div>
        </motion.div>
    )
}

export default LatestJobCards