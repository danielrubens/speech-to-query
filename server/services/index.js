// Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();

const encoding = 'MP3'
const sampleRateHertz = 16000
const languageCode = 'en-US'
const filename = './audios/classicmodels.mp3'
const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};
const audio = {
  content: fs.readFileSync(filename).toString('base64'),
};

const request = {
  config: config,
  audio: audio,
};

const getAudio = async ()=> {
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    return transcription
}

module.exports = { getAudio }