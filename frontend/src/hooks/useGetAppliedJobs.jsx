import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/get`,
                    { withCredentials: true, timeout: 5000 }
                );
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch {
                // Backend not running — fail silently
            }
        }
        fetchAppliedJobs();
    }, []);
};
export default useGetAppliedJobs;