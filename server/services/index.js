const fs = require('fs');
const speech = require('@google-cloud/speech');

const getTranscription = async () => {
  const encoding = 'MP3';
  const sampleRateHertz = 16000;
  const languageCode = 'en-US';

  // const options = { 1: './audios/classicmodels.mp3', 2: './audios/johnny-cash.mp3' };
  // const filename = options[id];
  const filename = './audios/classicmodels.mp3';

  const config = { encoding, sampleRateHertz, languageCode };
  const audio = { content: fs.readFileSync(filename).toString('base64') };
  const request = { config, audio };

  const client = new speech.SpeechClient();
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');
  return transcription;
};

module.exports = { getTranscription };
