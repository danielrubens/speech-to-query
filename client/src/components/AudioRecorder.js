import { useState } from 'react'
import vmsg from 'vmsg'

const recorder = new vmsg.Recorder({
    wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
})

const AudioRecorder = () => {
    const [loading, setLoading] = useState(false)
    const [recording, setRecording] = useState(false)
    const [recordings, setRecordings] = useState([])

    const record = async () => {
        setRecording(!recording)
        if(recording) {
            const blob = await recorder.stopRecording()
            setLoading(false)
            setRecordings(...recordings, URL.createObjectURL(blob))
        }else{
            try{
                await recorder.initAudio()
                await recorder.initWorker()
                recorder.startRecording()
                setLoading(false)
            }catch(error){
                console.log(error)
                setLoading(false)
            }
        }
    }

    return(
        <div>
            <button onClick={record}>
                {recording ? 'Stop': 'Record'}
            </button>
        </div>
    )
}

export default AudioRecorder