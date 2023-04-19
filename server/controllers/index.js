const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const { promisify } = require('util');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const service = require('../services');

const getTranscription = async (req, res) => {
  const transcription = await service.getTranscription();
  return res.status(200).json(transcription);
};

const getAudio = async (req, res) => {
  const { buffer } = req.file;
  // console.log(buffer);

  await writeFileAsync('./audios/teste.mp3', buffer);
  const ffmpegCommand = ffmpeg();

  // Load the audio file
  ffmpegCommand.input('./audios/teste.mp3');

  // Add a noise reduction filter to the audio
  ffmpegCommand.audioFilter('highpass=f=200, lowpass=f=3000');

  // Set the output format to WAV
  ffmpegCommand.format('mp3');

  // Set the output file path
  ffmpegCommand.output('./audios/teste_processed.mp3');

  // Run the FfmpegCommand and wait for it to finish
  await ffmpegCommand.run();

  // Read the processed audio file from disk
  // const processedBuffer = await readFileAsync('./audios/teste_processed.wav');


  try {
    const transcription = await service.transcriptFromClient(buffer);
    return res.status(200).json({ transcription });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// fs.writeFileSync('./audios/treated/teste.mp3', command);
// try {
//   const transcription = await service.transcriptFromClient(buffer);
//   return res.status(200).json({ transcription });
// } catch (error) {
//   return res.status(500).json({ error });
// }

module.exports = { getTranscription, getAudio };
