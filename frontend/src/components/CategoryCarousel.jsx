import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "DevOps Engineer",
    "UI/UX Designer",
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className='py-20 bg-background'>
            <div className='max-w-4xl mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='text-center mb-10'
                >
                    <span className='text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest'>
                        Explore By Category
                    </span>
                    <h2 className='text-3xl font-bold mt-2 text-foreground'>
                        Browse Popular Roles
                    </h2>
                </motion.div>

                <Carousel className="w-full">
                    <CarouselContent className="-ml-2">
                        {category.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 pl-2">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => searchJobHandler(cat)}
                                    className='w-full py-3 px-5 rounded-full text-sm font-semibold border-2 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] dark:hover:bg-violet-600 dark:hover:border-violet-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-purple-500/25'
                                >
                                    {cat}
                                </motion.button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='border-purple-200 dark:border-purple-800 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-all' />
                    <CarouselNext className='border-purple-200 dark:border-purple-800 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-all' />
                </Carousel>
            </div>
        </section>
    )
}

export default CategoryCarousel