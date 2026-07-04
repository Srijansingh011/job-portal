import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, Mail, Lock, Phone, User, ImagePlus, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) formData.append("file", input.file);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
                timeout: 5000, // 5 second timeout
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
                toast.error("Cannot reach server. Make sure the backend is running.");
            } else {
                toast.error(error.response?.data?.message || "Signup failed. Please try again.");
            }
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) navigate("/");
    }, []);

    return (
        <div className='min-h-screen bg-background'>
            <Navbar />
            <div className='relative flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-10 overflow-hidden'>
                {/* Background blobs */}
                <div className='absolute top-10 right-1/4 w-72 h-72 rounded-full bg-violet-300/20 dark:bg-violet-700/10 blur-3xl pointer-events-none' />
                <div className='absolute bottom-10 left-1/4 w-96 h-96 rounded-full bg-orange-300/10 dark:bg-orange-700/10 blur-3xl pointer-events-none' />

                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className='w-full max-w-lg relative z-10'
                >
                    <div className='bg-white dark:bg-[#13132a] rounded-3xl shadow-2xl shadow-purple-500/10 border border-gray-100 dark:border-purple-900/30 p-8'>
                        {/* Header */}
                        <div className='flex flex-col items-center mb-7'>
                            <div className='w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center mb-3 shadow-lg shadow-purple-500/30'>
                                <Briefcase className='w-6 h-6 text-white' />
                            </div>
                            <h1 className='text-2xl font-bold text-foreground'>Create account</h1>
                            <p className='text-sm text-muted-foreground mt-1'>Start your career journey today</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-4'>
                            {/* Full Name */}
                            <div>
                                <Label className='text-sm font-medium mb-1.5 block'>Full Name</Label>
                                <div className='relative'>
                                    <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                    <Input
                                        type="text" name="fullname" value={input.fullname}
                                        onChange={changeEventHandler} placeholder="John Doe"
                                        className='pl-10 h-11 bg-gray-50 dark:bg-purple-950/30 border-gray-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl transition-all'
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <Label className='text-sm font-medium mb-1.5 block'>Email</Label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                    <Input
                                        type="email" name="email" value={input.email}
                                        onChange={changeEventHandler} placeholder="you@example.com"
                                        className='pl-10 h-11 bg-gray-50 dark:bg-purple-950/30 border-gray-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl transition-all'
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <Label className='text-sm font-medium mb-1.5 block'>Phone Number</Label>
                                <div className='relative'>
                                    <Phone className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                    <Input
                                        type="text" name="phoneNumber" value={input.phoneNumber}
                                        onChange={changeEventHandler} placeholder="9876543210"
                                        className='pl-10 h-11 bg-gray-50 dark:bg-purple-950/30 border-gray-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl transition-all'
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <Label className='text-sm font-medium mb-1.5 block'>Password</Label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                    <Input
                                        type="password" name="password" value={input.password}
                                        onChange={changeEventHandler} placeholder="••••••••"
                                        className='pl-10 h-11 bg-gray-50 dark:bg-purple-950/30 border-gray-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl transition-all'
                                    />
                                </div>
                            </div>

                            {/* Role + Profile Photo */}
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <Label className='text-sm font-medium mb-2 block'>I am a</Label>
                                    <RadioGroup className="flex flex-col gap-2">
                                        {['student', 'recruiter'].map((role) => (
                                            <label
                                                key={role}
                                                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium capitalize ${
                                                    input.role === role
                                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                                        : 'border-gray-200 dark:border-purple-900/50 hover:border-purple-300'
                                                }`}
                                            >
                                                <Input
                                                    type="radio" name="role" value={role}
                                                    checked={input.role === role}
                                                    onChange={changeEventHandler}
                                                    className="sr-only"
                                                />
                                                {role}
                                            </label>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label className='text-sm font-medium mb-2 block'>Profile Photo</Label>
                                    <label className='flex flex-col items-center justify-center h-full min-h-[88px] border-2 border-dashed border-gray-200 dark:border-purple-900/50 rounded-xl cursor-pointer hover:border-purple-400 dark:hover:border-purple-600 transition-all bg-gray-50 dark:bg-purple-950/20 gap-1'>
                                        <ImagePlus className='w-5 h-5 text-muted-foreground' />
                                        <span className='text-xs text-muted-foreground text-center px-2'>
                                            {input.file ? input.file.name?.substring(0, 12) + '…' : 'Upload photo'}
                                        </span>
                                        <Input
                                            accept="image/*" type="file"
                                            onChange={changeFileHandler}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Submit */}
                            {loading ? (
                                <Button className="w-full h-11 brand-gradient text-white rounded-xl" disabled>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Creating account...
                                </Button>
                            ) : (
                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                    <Button type="submit" className="w-full h-11 brand-gradient text-white rounded-xl shadow-lg shadow-purple-500/30 hover:opacity-90">
                                        Create Account
                                    </Button>
                                </motion.div>
                            )}
                        </form>

                        <p className='text-center text-sm text-muted-foreground mt-5'>
                            Already have an account?{' '}
                            <Link to="/login" className='text-purple-600 dark:text-purple-400 font-semibold hover:underline'>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Signup