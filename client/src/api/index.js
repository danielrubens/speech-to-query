import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:4010/'})

const getAudio = async () =>{
    const response = await API.get('/')
    console.log(response)
    return response

} 
const sendAudio = async (audio) => {
    try{
    const response = await API.post('/upload-audio', audio)
    console.log(response)
    return response.data
    }catch(error){
        console.log(error)
    }
}

const transcript = async (content) => {
    try{
        const response = await API.post('/upload-audio', content)
        console.log(response)
    }catch(error){
        console.log(error)
    }
}
// const sendAudio = (formData) => {
//     const message = fetch('http://localhost:4010/upload-audio', {
//             method: 'POST',
//             body: formData
//           })
//             .then(response => response.json()).then(data => data)
//             // .then(data => {
//             //   console.log('Upload successful:', data);
//             // })
//             .catch(error => {
//               console.error('Error uploading audio:', error);
//             });
//     return message
// }
export {sendAudio, transcript, getAudio}