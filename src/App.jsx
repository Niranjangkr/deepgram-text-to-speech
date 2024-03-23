import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [audioAvailable, setAudioAvailable] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const url = "https://api.deepgram.com/v1/speak?model=aura-asteria-en";
  const apiKey = import.meta.env.VITE_DEEPGRAM_KEY;;

  const onSubmit = async () => {
    if (!text) {
      alert('Enter text first');
      return;
    }
    const data = {
      text
    }

    const config = {
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      responseType: 'blob' 
    }

    try {
      const res = await axios.post(url, data, config);
      if (res.status !== 200) {
        console.error(`HTTP error! Status: ${res.status}`);
        alert(`HTTP error! Status: ${res.status}`)
        return;
      }

      const audioBlobUrl = URL.createObjectURL(res.data);
      setAudioUrl(audioBlobUrl);
    } catch (error) {
      console.error("Error:", error.message);
      alert("something went wrong check console");
    }
  }

  console.log(text)

  return (
     <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '200px', margin: 'auto', textAlign: 'center' }}>
      <label htmlFor="tts">Enter Text: </label>
      <textarea type="text" id='tts' onChange={(e) => setText(e.target.value)} />
      <button onClick={onSubmit}>submit</button>
      {
        audioUrl &&
        <audio controls src={audioUrl}></audio> 
      }
    </div>
  )
}

export default App
