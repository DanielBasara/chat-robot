import React, { useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
 
function App() {
  const [inputValue, setInputValue] = useState("")
  const [response,setResponse]=useState("")
  const [loading, setLoading] = useState(false)
  const handleSendButtonClick=async ()=>{
    setLoading(true)    
    const translatedText = await fetch("/api/translate",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({text:inputValue,targetLanguage:"Chinese"})
    })
    if (translatedText.ok) {
      const textObject = await translatedText.json()
      
      setResponse(textObject.translatedText);
    
    } else {
      throw new Error('Translation failed');
    }

    setLoading(false)
    setInputValue("")
  }
  const handleDeleteButtonClick=()=>{
    setResponse("")
    
  }

  return (
    <div className="App">
      <header className="App-header">
      <StyledH1>JOJO翻译机器人1.0版
      </StyledH1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <StyledDiv>
        <StyledP>{response?response:""}</StyledP>
      </StyledDiv>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          id="outlined-password-input"
          label="快问我问题"
          value={inputValue}
          onChange={(e)=>setInputValue(e.target.value)}
        />
        {loading && <CircularProgress />}
      </Box>
      <Button variant="contained" color="success" onClick={handleSendButtonClick}>
        快回答！
      </Button>
      <Button variant="contained" color="error" onClick={handleDeleteButtonClick}>
        我们重新开始
      </Button>
    </div>
  );
}

export default App;

const StyledH1 = styled('h1')({
  color:"black"

});
const StyledDiv = styled('div')({
  marginTop:"30px",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"center",
  height:"100%",
  width:"100%",
  textAlign:"left",
});

const StyledP = styled('p')({
  maxWidth:"400px",
  whiteSpace:"pre-wrap",
  wordWrap:"break-word",

});