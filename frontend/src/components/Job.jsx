import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock, Building2 } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    const daysAgo = daysAgoFunction(job?.createdAt);

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className='group p-5 rounded-2xl bg-white dark:bg-[#13132a] border border-gray-100 dark:border-purple-900/30 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300'
        >
            {/* Header */}
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    <div className='w-11 h-11 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/50 dark:to-violet-900/50 flex items-center justify-center overflow-hidden flex-shrink-0'>
                        {job?.company?.logo ? (
                            <Avatar className="w-9 h-9">
                                <AvatarImage src={job?.company?.logo} />
                            </Avatar>
                        ) : (
                            <Building2 className='w-5 h-5 text-purple-500' />
                        )}
                    </div>
                    <div>
                        <h1 className='font-semibold text-sm text-foreground'>{job?.company?.name}</h1>
                        <div className='flex items-center gap-1 text-muted-foreground text-xs mt-0.5'>
                            <MapPin className='w-3 h-3' />
                            <span>{job?.location || 'India'}</span>
                        </div>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-purple-900/50 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-muted-foreground hover:text-purple-600 transition-all'
                >
                    <Bookmark className='w-4 h-4' />
                </motion.button>
            </div>

            {/* Job Info */}
            <div className='mb-4'>
                <h1 className='font-bold text-base text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1 mb-1'>
                    {job?.title}
                </h1>
                <p className='text-xs text-muted-foreground line-clamp-2 leading-relaxed'>
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-2 mb-4'>
                <Badge className='bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold px-2.5 py-1'>
                    {job?.position} Position{job?.position !== 1 ? 's' : ''}
                </Badge>
                <Badge className='bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 text-xs font-semibold px-2.5 py-1'>
                    {job?.jobType}
                </Badge>
                <Badge className='bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-semibold px-2.5 py-1'>
                    ₹{job?.salary} LPA
                </Badge>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between pt-3 border-t border-gray-100 dark:border-purple-900/20'>
                <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                    <Clock className='w-3 h-3' />
                    <span>{daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <Button
                        onClick={() => navigate(`/description/${job?._id}`)}
                        variant="outline"
                        size="sm"
                        className='text-xs border-purple-200 dark:border-purple-800 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all h-8'
                    >
                        Details
                    </Button>
                    <Button
                        size="sm"
                        className='text-xs brand-gradient text-white hover:opacity-90 shadow-sm shadow-purple-500/30 h-8'
                    >
                        Save
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

export default Job