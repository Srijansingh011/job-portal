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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                timeout: 5000,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
                toast.error("Cannot reach server. Make sure the backend is running.");
            } else {
                toast.error(error.response?.data?.message || "Login failed. Please try again.");
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
            <div className='relative flex items-center justify-center min-h-[calc(100vh-64px)] px-4 overflow-hidden'>
                {/* Background blobs */}
                <div className='absolute top-10 left-1/4 w-72 h-72 rounded-full bg-purple-300/20 dark:bg-purple-700/10 blur-3xl pointer-events-none' />
                <div className='absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-violet-300/20 dark:bg-violet-700/10 blur-3xl pointer-events-none' />

                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className='w-full max-w-md relative z-10'
                >
                    {/* Card */}
                    <div className='bg-white dark:bg-[#13132a] rounded-3xl shadow-2xl shadow-purple-500/10 border border-gray-100 dark:border-purple-900/30 p-8'>
                        {/* Logo */}
                        <div className='flex flex-col items-center mb-8'>
                            <div className='w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center mb-3 shadow-lg shadow-purple-500/30'>
                                <Briefcase className='w-6 h-6 text-white' />
                            </div>
                            <h1 className='text-2xl font-bold text-foreground'>Welcome back</h1>
                            <p className='text-sm text-muted-foreground mt-1'>Sign in to your account</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-4'>
                            {/* Email */}
                            <div>
                                <Label className='text-sm font-medium text-foreground mb-1.5 block'>Email</Label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        placeholder="you@example.com"
                                        className='pl-10 h-11 bg-gray-50 dark:bg-purple-950/30 border-gray-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all rounded-xl'
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <Label className='text-sm font-medium text-foreground mb-1.5 block'>Password</Label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                    <Input
                                        type="password"
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        placeholder="••••••••"
                                        className='pl-10 h-11 bg-gray-50 dark:bg-purple-950/30 border-gray-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all rounded-xl'
                                    />
                                </div>
                            </div>

                            {/* Role */}
                            <div>
                                <Label className='text-sm font-medium text-foreground mb-2 block'>I am a</Label>
                                <RadioGroup className="grid grid-cols-2 gap-3">
                                    {['student', 'recruiter'].map((role) => (
                                        <label
                                            key={role}
                                            className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                                input.role === role
                                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                                    : 'border-gray-200 dark:border-purple-900/50 hover:border-purple-300 dark:hover:border-purple-700'
                                            }`}
                                        >
                                            <Input
                                                type="radio"
                                                name="role"
                                                value={role}
                                                checked={input.role === role}
                                                onChange={changeEventHandler}
                                                className="sr-only"
                                            />
                                            <span className='text-sm font-medium capitalize'>{role}</span>
                                        </label>
                                    ))}
                                </RadioGroup>
                            </div>

                            {/* Submit */}
                            {loading ? (
                                <Button className="w-full h-11 brand-gradient text-white rounded-xl" disabled>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                </Button>
                            ) : (
                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                    <Button type="submit" className="w-full h-11 brand-gradient text-white rounded-xl shadow-lg shadow-purple-500/30 hover:opacity-90">
                                        Sign In
                                    </Button>
                                </motion.div>
                            )}
                        </form>

                        <p className='text-center text-sm text-muted-foreground mt-6'>
                            Don't have an account?{' '}
                            <Link to="/signup" className='text-purple-600 dark:text-purple-400 font-semibold hover:underline'>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Login