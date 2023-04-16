const { spawn } = require('child_process');
const fs = require('fs');
const service = require('../services');

const getTranscription = async (req, res) => {
  const transcription = await service.getTranscription();
  return res.status(200).json(transcription);
};

const getAudio = async (req, res) => {
  console.log('Received audio file:', req.file);
  res.send('Audio upload successful');
  // return res.status(200).json('Hello')
};


module.exports = { getTranscription, getAudio };
