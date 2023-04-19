const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const { promisify } = require('util');
const service = require('../services');

const writeFileAsync = promisify(fs.writeFile);

const getTranscription = async (req, res) => {
  const transcription = await service.getTranscription();
  return res.status(200).json(transcription);
};

const getAudio = async (req, res) => {
  const { buffer } = req.file;
  const path = './audios/teste_processed.mp3';
  await writeFileAsync('./audios/teste.mp3', buffer);
  const ffmpegCommand = ffmpeg();
  ffmpegCommand.input('./audios/teste.mp3');
  ffmpegCommand.audioFilter('highpass=f=200, lowpass=f=3000');
  ffmpegCommand.format('mp3');
  ffmpegCommand.output(path);

  await ffmpegCommand.run();

  try {
    const transcription = await service.transcriptFromClient(path);
    return res.status(200).json({ transcription });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { getTranscription, getAudio };
