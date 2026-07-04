import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const clearFilter = () => {
        setSelectedValue('');
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className='w-full bg-white dark:bg-[#13132a] p-5 rounded-2xl border border-gray-100 dark:border-purple-900/30 shadow-sm sticky top-24'
        >
            {/* Header */}
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-2'>
                    <div className='w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center'>
                        <SlidersHorizontal className='w-3.5 h-3.5 text-purple-600 dark:text-purple-400' />
                    </div>
                    <h1 className='font-bold text-sm text-foreground'>Filter Jobs</h1>
                </div>
                {selectedValue && (
                    <button
                        onClick={clearFilter}
                        className='flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors'
                    >
                        <X className='w-3 h-3' />
                        Clear
                    </button>
                )}
            </div>

            <hr className='border-gray-100 dark:border-purple-900/30 mb-4' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {fitlerData.map((data, index) => (
                    <div key={index} className='mb-5'>
                        <h2 className='font-semibold text-xs text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-3'>
                            {data.fitlerType}
                        </h2>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 4 }}
                                    className={`flex items-center space-x-2.5 my-2 p-2 rounded-lg cursor-pointer transition-colors ${
                                        selectedValue === item
                                            ? 'bg-purple-50 dark:bg-purple-900/30'
                                            : 'hover:bg-gray-50 dark:hover:bg-purple-950/20'
                                    }`}
                                >
                                    <RadioGroupItem
                                        value={item}
                                        id={itemId}
                                        className='border-purple-300 dark:border-purple-700 text-purple-600'
                                    />
                                    <Label
                                        htmlFor={itemId}
                                        className={`text-sm cursor-pointer transition-colors ${
                                            selectedValue === item
                                                ? 'text-purple-700 dark:text-purple-300 font-semibold'
                                                : 'text-foreground/80'
                                        }`}
                                    >
                                        {item}
                                    </Label>
                                </motion.div>
                            )
                        })}
                    </div>
                ))}
            </RadioGroup>
        </motion.div>
    )
}

export default FilterCard