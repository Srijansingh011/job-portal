import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(
                    `${COMPANY_API_END_POINT}/get`,
                    { withCredentials: true, timeout: 5000 }
                );
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch {
                // Backend not running — fail silently
            }
        }
        fetchCompanies();
    }, [])
}

export default useGetAllCompanies