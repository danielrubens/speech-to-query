const fs = require('fs');
const { promisify } = require('util');
const service = require('../services');

const readFile = promisify(fs.readFile);

const getTranscription = async (req, res) => {
  const transcription = await service.getTranscription();
  return res.status(200).json(transcription);
};

// const base64ToBuffer = (base64String) => Buffer.from(base64String, 'base64').toString('hex');

const getAudio = async (req, res) => {
  const audioData = req.file.buffer;
  const transcription = await service.transcriptFromClient(audioData);
  return res.status(200).json({ transcription });
};

module.exports = { getTranscription, getAudio };
