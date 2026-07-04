import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className='bg-[#0a0a18] dark:bg-[#050510] text-white'>
            {/* Main Footer */}
            <div className='max-w-7xl mx-auto px-4 py-16'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
                    {/* Brand */}
                    <div className='md:col-span-1'>
                        <div className='flex items-center gap-2 mb-4'>
                            <div className='w-9 h-9 rounded-xl brand-gradient flex items-center justify-center'>
                                <Briefcase className='w-4 h-4 text-white' />
                            </div>
                            <span className='text-xl font-bold'>
                                Job<span className='gradient-text'>Portal</span>
                            </span>
                        </div>
                        <p className='text-sm text-white/50 leading-relaxed mb-6'>
                            Connecting talented professionals with their dream opportunities. Start your journey today.
                        </p>
                        {/* Social Icons */}
                        <div className='flex gap-3'>
                            {[
                                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                            ].map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    whileHover={{ scale: 1.15, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className='w-9 h-9 rounded-xl bg-white/5 hover:bg-[#6A38C2] flex items-center justify-center transition-colors duration-300'
                                >
                                    <Icon className='w-4 h-4' />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* For Job Seekers */}
                    <div>
                        <h3 className='text-sm font-bold uppercase tracking-widest text-purple-400 mb-5'>For Job Seekers</h3>
                        <ul className='space-y-3'>
                            {[
                                { to: "/jobs", label: "Browse Jobs" },
                                { to: "/browse", label: "Search Results" },
                                { to: "/profile", label: "My Profile" },
                            ].map(({ to, label }) => (
                                <li key={label}>
                                    <Link to={to} className='text-sm text-white/50 hover:text-purple-400 transition-colors'>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Recruiters */}
                    <div>
                        <h3 className='text-sm font-bold uppercase tracking-widest text-purple-400 mb-5'>For Recruiters</h3>
                        <ul className='space-y-3'>
                            {[
                                { to: "/admin/companies", label: "My Companies" },
                                { to: "/admin/jobs", label: "Manage Jobs" },
                                { to: "/admin/jobs/create", label: "Post a Job" },
                            ].map(({ to, label }) => (
                                <li key={label}>
                                    <Link to={to} className='text-sm text-white/50 hover:text-purple-400 transition-colors'>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className='text-sm font-bold uppercase tracking-widest text-purple-400 mb-5'>Contact</h3>
                        <ul className='space-y-3'>
                            <li className='flex items-center gap-2 text-sm text-white/50'>
                                <Mail className='w-4 h-4 text-purple-500 flex-shrink-0' />
                                <span>support@jobportal.com</span>
                            </li>
                            <li className='flex items-center gap-2 text-sm text-white/50'>
                                <Phone className='w-4 h-4 text-purple-500 flex-shrink-0' />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className='flex items-center gap-2 text-sm text-white/50'>
                                <MapPin className='w-4 h-4 text-purple-500 flex-shrink-0' />
                                <span>Bangalore, India</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='border-t border-white/5'>
                <div className='max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3'>
                    <p className='text-xs text-white/30'>
                        © 2024 JobPortal. All rights reserved.
                    </p>
                    <div className='flex items-center gap-6 text-xs text-white/30'>
                        <span className='hover:text-purple-400 cursor-pointer transition-colors'>Privacy Policy</span>
                        <span className='hover:text-purple-400 cursor-pointer transition-colors'>Terms of Service</span>
                        <span className='hover:text-purple-400 cursor-pointer transition-colors'>Cookie Policy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;