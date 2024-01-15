import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Field from '../Components/Field';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

export default function AddRules() {
    const location = useLocation();
    const fields = location.state.headers;
    const filePath=location.state.file_path
    const [requestBody,setRequestBody]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        console.log(requestBody)
    },[requestBody])

    const storeMetaDataAndRules=async()=>{
        const body={
            source_name:"googledrive",
            fields:requestBody
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/create_metadata_and_rules", body);
            // Handle success
            console.log('Response:', response.data);
            navigate("/save-data",{state:{file_path:filePath,data:response.data,source:"googledrive"}})

          } catch (error) {
            // Handle error
            console.error('Error:', error);
          }
    }

    return (
    <div>
        {
            fields.map((field_name)=><Field fieldName={field_name} 
            key={field_name} requestBody={requestBody}
            setRequestBody={setRequestBody}
            />)
        }
         <Button variant="contained" endIcon={<SendIcon />} 
        onClick={(e)=>{
            e.preventDefault()
            storeMetaDataAndRules()
        }}>
            NEXT
        </Button>
    </div>
  )
}
