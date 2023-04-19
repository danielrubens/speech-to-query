import { useState, useEffect } from 'react'
import vmsg from 'vmsg'
import { sendAudio }from '../api'

const recorder = new vmsg.Recorder({
    wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
})

const AudioRecorder = () => {
    const [loading, setLoading] = useState(false)
    const [recording, setRecording] = useState(false)
    const [recordings, setRecordings] = useState([])
    // const [savedForm, setSavedForm] = useState([])
    // const [transcription, setTranscription] = useState('')

    // useEffect(() => {if(savedForm) sendAudio(savedForm).then((res) => setTranscription(res.data.transcription))}, [savedForm])


    const record = async () => {
        setLoading(true)
        if(recording) {
            const blob = await recorder.stopRecording()
            setLoading(false)
            setRecording(false)
            setRecordings([...recordings, URL.createObjectURL(blob)])
            
        }else{
            try{
                await recorder.initAudio()
                await recorder.initWorker()
                recorder.startRecording()
                setLoading(false)
                setRecording(true)
            }catch(error){
                console.log({error})
                setLoading(false)
            }
        }
    }

    const handleDelete = (index) => {
        const filtered = recordings.filter((i, objIndex) => objIndex !== index)
        setRecordings(filtered)
    }


    const handleTranscription = async (index) => {
        const audioBlob = await fetch(recordings[index])
        .then(response => response.blob());
        const formData = new FormData()
        formData.append('audio', audioBlob);
        await sendAudio(formData)
        // const audioUrl = await fetch(recordings[index])
        //   .then(response => response.blob())
        //   .then(blob => URL.createObjectURL(blob));
        // const formData = new FormData()
        // formData.append('audio', audioUrl);
        // await sendAudio(formData)
        // setSavedForm(formData)
        // URL.revokeObjectURL(audioUrl);
      }

    return(
        <div>
            <button onClick={record} disabled={loading}>
                {recording ? 'Stop': 'Record'}
            </button>
            <ul>
                {recordings.map((i, index) => (
                <li key={`audio-${index}`}>
                    <audio src={i} controls></audio>
                    <button onClick={() => handleDelete(index)}>Deletar</button>
                    <button onClick={() => handleTranscription(index)}>Transcription</button>
                </li>))}
                {/* {transcription.length > 0 && (<p>{transcription}</p>)} */}
            </ul>
        </div>
    )
}

export default AudioRecorder