import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
                    { withCredentials: true, timeout: 5000 }
                );
                if (res.data.success && res.data.jobs?.length > 0) {
                    // Only replace mock data if real jobs come from API
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch {
                // Backend not running — silently keep mock jobs, no error toast
            }
        }
        fetchAllJobs();
    }, [searchedQuery])
}

export default useGetAllJobs