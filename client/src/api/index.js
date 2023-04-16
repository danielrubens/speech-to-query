import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:4010/'})

const sendAudio = async (audio) => {
    try{
    const response = await API.post('/upload-audio', audio)
    console.log(response.data)
    return response.data
    }catch(error){
        console.log(error)
    }
}

export default sendAudio