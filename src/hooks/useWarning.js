import { warningApi } from "../services/warningService";
import {useState,useEffect} from 'react';

export const useWarning = ()=>{
    const [warnings,setWarnings] = useState([])

    const fetchAllWarnings = async()=>{
        try{
            const response = await warningApi.getAll();
            console.log(response,'response')
            setWarnings(response?.data?.results);
        }
        catch(error){
            console.error("Error");
        }
        finally{

        }
    }

   const addWarning = (data) =>{
    console.log("addWarningdata",data)
        try{
            warningApi.create(data);
            fetchAllWarnings();

        }catch{

        }finally{}
    }

    useEffect(()=>{
        fetchAllWarnings();
       },[])

       return(
        
           { warnings,
            addWarning}
        
       )
}