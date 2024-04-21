import {useState, useEffect} from "react"
import axios from "axios"
const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=> {
        const fetchData = async() => {
            setLoading(true);
            try{
                // console.log("Entered in useFetch", url);
                const res = await axios.get(url);
                // console.log("UseFetch", res.data)
                setData(res.data);
            } catch(err) {
                // console.log("useFetch", err)
                setError(err);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const reFetch = async() => {
        setLoading(true);
        try{
            const res = await axios.get(url);
            setData(res.data);
        } catch(err) {
            setError(err);
        }
        setLoading(false);
    }
    
    return {data, loading, error, reFetch}
}

export default useFetch;

