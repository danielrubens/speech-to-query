const fs = require('fs');
const service = require('../services');

const getTranscription = async (req, res) => {
  const transcription = await service.getTranscription();
  return res.status(200).json(transcription);
};

const getAudio = async (req, res) => {
  const { buffer } = req.file;
  fs.writeFile('./audios/teste.mp3', buffer, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  console.log({ buffer });
  const response = await service.transcriptFromClient(buffer);
  // console.log({response})
  return res.status(200).json(response);
};

module.exports = { getTranscription, getAudio };
