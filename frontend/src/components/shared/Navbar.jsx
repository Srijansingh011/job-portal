import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Sun, Moon, Briefcase } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? 'bg-white/80 dark:bg-[#0d0d1a]/80 backdrop-blur-xl shadow-lg shadow-purple-500/5 border-b border-purple-100/30 dark:border-purple-900/30'
                    : 'bg-transparent'
            }`}
        >
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                {/* Logo */}
                <Link to="/">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className='flex items-center gap-2'
                    >
                        <div className='flex items-center justify-center w-8 h-8 rounded-lg brand-gradient'>
                            <Briefcase className='w-4 h-4 text-white' />
                        </div>
                        <h1 className='text-2xl font-bold tracking-tight'>
                            Job<span className='gradient-text'>Portal</span>
                        </h1>
                    </motion.div>
                </Link>

                {/* Nav Links + Actions */}
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6 text-sm'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className='nav-link text-foreground/80 hover:text-[#6A38C2] dark:hover:text-violet-400 transition-colors'>
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs" className='nav-link text-foreground/80 hover:text-[#6A38C2] dark:hover:text-violet-400 transition-colors'>
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className='nav-link text-foreground/80 hover:text-[#6A38C2] dark:hover:text-violet-400 transition-colors'>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className='nav-link text-foreground/80 hover:text-[#6A38C2] dark:hover:text-violet-400 transition-colors'>
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse" className='nav-link text-foreground/80 hover:text-[#6A38C2] dark:hover:text-violet-400 transition-colors'>
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Theme Toggle */}
                    {mounted && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className='w-9 h-9 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors'
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className='w-4 h-4' /> : <Moon className='w-4 h-4' />}
                        </motion.button>
                    )}

                    {/* Auth */}
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <Button variant="outline" className="border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="brand-gradient text-white hover:opacity-90 shadow-lg shadow-purple-500/30 transition-all">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <motion.div whileHover={{ scale: 1.05 }} className='cursor-pointer'>
                                    <Avatar className="ring-2 ring-purple-400 ring-offset-2 ring-offset-background">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                </motion.div>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-0 overflow-hidden border border-purple-100 dark:border-purple-900 shadow-xl shadow-purple-500/10">
                                <div className='p-1'>
                                    <div className='flex gap-3 p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50 rounded-lg'>
                                        <Avatar className="ring-2 ring-purple-400">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold text-sm'>{user?.fullname}</h4>
                                            <p className='text-xs text-muted-foreground mt-0.5'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col mt-1 gap-1'>
                                        {user && user.role === 'student' && (
                                            <div className='flex items-center gap-2 px-3 py-2 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/30 cursor-pointer transition-colors'>
                                                <User2 className='w-4 h-4 text-purple-600' />
                                                <Button variant="link" className="p-0 h-auto text-sm font-medium text-foreground">
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                                        <div
                                            onClick={logoutHandler}
                                            className='flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors text-red-600'
                                        >
                                            <LogOut className='w-4 h-4' />
                                            <span className='text-sm font-medium'>Logout</span>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar