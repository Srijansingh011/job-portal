import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { motion } from 'framer-motion';
import {
    MapPin, Briefcase, DollarSign, Users, Calendar,
    Clock, ArrowLeft, CheckCircle2, Building2, GraduationCap
} from 'lucide-react';

const JobDescription = () => {
    const { singleJob, allJobs } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(
        application => application.applicant === user?._id
    ) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            // If it's a mock job, just fake the successful application locally
            if (jobId.startsWith("mock_")) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...(singleJob.applications || []), { applicant: user?._id || 'guest' }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success("Successfully applied (Mock)");
                return;
            }

            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                { withCredentials: true }
            );
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...(singleJob.applications || []), { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply");
        }
    }

    useEffect(() => {
        // First try to find job in mock/local data
        const localJob = allJobs.find(j => j._id === jobId);
        if (localJob) {
            dispatch(setSingleJob(localJob));
            setIsApplied(
                localJob.applications?.some(a => a.applicant === user?._id) || false
            );
            return;
        }

        // Otherwise fetch from API
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(
                        res.data.job.applications.some(a => a.applicant === user?._id)
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id, allJobs]);

    const daysAgo = singleJob?.createdAt
        ? Math.floor((Date.now() - new Date(singleJob.createdAt)) / (1000 * 60 * 60 * 24))
        : 0;

    if (!singleJob) {
        return (
            <div className='min-h-screen bg-background'>
                <Navbar />
                <div className='flex items-center justify-center h-[80vh]'>
                    <div className='text-center'>
                        <div className='w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mx-auto mb-4' />
                        <p className='text-muted-foreground'>Loading job details...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-background'>
            <Navbar />

            <div className='max-w-5xl mx-auto px-4 py-10'>
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className='flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-8'
                >
                    <ArrowLeft className='w-4 h-4' />
                    Back to Jobs
                </motion.button>

                {/* Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className='bg-white dark:bg-[#13132a] rounded-2xl border border-gray-100 dark:border-purple-900/30 shadow-sm p-8 mb-6'
                >
                    <div className='flex flex-col md:flex-row md:items-start justify-between gap-6'>
                        <div className='flex items-start gap-4'>
                            {/* Company Logo */}
                            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/50 dark:to-violet-900/50 flex items-center justify-center flex-shrink-0'>
                                <Building2 className='w-8 h-8 text-purple-600 dark:text-purple-400' />
                            </div>
                            <div>
                                <h1 className='text-2xl font-bold text-foreground mb-1'>
                                    {singleJob?.title}
                                </h1>
                                <div className='flex items-center gap-1.5 text-muted-foreground text-sm mb-3'>
                                    <Building2 className='w-3.5 h-3.5' />
                                    <span className='font-medium text-foreground'>{singleJob?.company?.name}</span>
                                    <span>·</span>
                                    <MapPin className='w-3.5 h-3.5' />
                                    <span>{singleJob?.location}</span>
                                </div>
                                {/* Badges */}
                                <div className='flex flex-wrap gap-2'>
                                    <Badge className='bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-semibold text-xs px-3 py-1'>
                                        {singleJob?.position} Position{singleJob?.position !== 1 ? 's' : ''}
                                    </Badge>
                                    <Badge className='bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 font-semibold text-xs px-3 py-1'>
                                        {singleJob?.jobType}
                                    </Badge>
                                    <Badge className='bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-semibold text-xs px-3 py-1'>
                                        ₹{singleJob?.salary} LPA
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <motion.div whileHover={{ scale: isApplied ? 1 : 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`px-8 py-5 rounded-xl font-semibold text-sm ${
                                    isApplied
                                        ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                        : 'brand-gradient text-white shadow-lg shadow-purple-500/30 hover:opacity-90'
                                }`}
                            >
                                {isApplied ? (
                                    <span className='flex items-center gap-2'>
                                        <CheckCircle2 className='w-4 h-4' />
                                        Already Applied
                                    </span>
                                ) : (
                                    'Apply Now'
                                )}
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className='md:col-span-2 space-y-6'
                    >
                        {/* Description */}
                        <div className='bg-white dark:bg-[#13132a] rounded-2xl border border-gray-100 dark:border-purple-900/30 shadow-sm p-6'>
                            <h2 className='text-base font-bold text-foreground mb-3 flex items-center gap-2'>
                                <Briefcase className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                                Job Description
                            </h2>
                            <p className='text-sm text-muted-foreground leading-relaxed'>
                                {singleJob?.description}
                            </p>
                        </div>

                        {/* Requirements / Skills */}
                        {singleJob?.requirements?.length > 0 && (
                            <div className='bg-white dark:bg-[#13132a] rounded-2xl border border-gray-100 dark:border-purple-900/30 shadow-sm p-6'>
                                <h2 className='text-base font-bold text-foreground mb-4 flex items-center gap-2'>
                                    <CheckCircle2 className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                                    Required Skills
                                </h2>
                                <div className='flex flex-wrap gap-2'>
                                    {singleJob.requirements.map((skill, i) => (
                                        <span
                                            key={i}
                                            className='px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-semibold'
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className='space-y-4'
                    >
                        <div className='bg-white dark:bg-[#13132a] rounded-2xl border border-gray-100 dark:border-purple-900/30 shadow-sm p-6'>
                            <h2 className='text-sm font-bold text-foreground mb-4'>Job Overview</h2>
                            <div className='space-y-4'>
                                {[
                                    { icon: MapPin, label: "Location", value: singleJob?.location },
                                    { icon: Briefcase, label: "Job Type", value: singleJob?.jobType },
                                    { icon: DollarSign, label: "Salary", value: `₹${singleJob?.salary} LPA` },
                                    { icon: GraduationCap, label: "Experience", value: `${singleJob?.experience || 0}+ years` },
                                    { icon: Users, label: "Openings", value: `${singleJob?.position} position${singleJob?.position !== 1 ? 's' : ''}` },
                                    { icon: Clock, label: "Applicants", value: `${singleJob?.applications?.length || 0} applied` },
                                    { icon: Calendar, label: "Posted", value: daysAgo === 0 ? 'Today' : `${daysAgo} days ago` },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className='flex items-start gap-3'>
                                        <div className='w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                            <Icon className='w-3.5 h-3.5 text-purple-600 dark:text-purple-400' />
                                        </div>
                                        <div>
                                            <p className='text-xs text-muted-foreground'>{label}</p>
                                            <p className='text-sm font-semibold text-foreground mt-0.5'>{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription