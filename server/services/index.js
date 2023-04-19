// const Speechfrombuffer = require('google-speech-from-buffer');
const fs = require('fs');
const speech = require('@google-cloud/speech');

require('dotenv').config();

// const { CREDENTIALS } = process.env;

const getTranscription = async () => {
  const encoding = 'MP3';
  const sampleRateHertz = 48000;
  const languageCode = 'en-US';
  const filename = './audios/johnny-cash.mp3';
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

async function transcriptFromClient(audioData) {
  const encoding = 'FLAC';
  const sampleRateHertz = 44100;
  const languageCode = 'en-US';

  const config = {
    encoding, sampleRateHertz, languageCode, interimResults: true,
  };
  const audio = { content: audioData };
  const request = { config, audio };

  const client = new speech.SpeechClient();
  const [response] = await client.recognize(request);

  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');

  return transcription;
}

module.exports = { getTranscription, transcriptFromClient };
