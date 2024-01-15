import React, { useState } from "react";
import { Button, TextField,Box} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useNavigate} from "react-router-dom";
const Upload=()=>{
    const [fileURL,setFileURL]=useState("")
    const navigate = useNavigate();
    const getHeaders=async()=>{
        try {
            const temp=fileURL.split("d/")[1]
            const fileID=temp.split("/")[0]


            const response = await axios.get(`http://127.0.0.1:8000/csv_headers?file_id=${fileID}`);
            const hdrs= response.data.headers;
            const fpath=response.data.file_path
            navigate("/add-rules",{state:{headers:hdrs,file_path:fpath}})

          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error
          }
    }
    return(
        <>
        <Box style={{display:"flex",flexDirection:"column",width:800,gap:"24px",margin:20}}>
       <TextField id="filled-basic" 
       label="Enter Google Drive File ID Here" 
       value={fileURL} onChange={(e)=>{
        setFileURL(e.target.value)
       }}/>
       

        <Button variant="contained" endIcon={<SendIcon />} 
        onClick={(e)=>{
            getHeaders()
        }} style={{width:100}}>
            NEXT
        </Button>
        </Box>
        </>
    )
}

export default Upload