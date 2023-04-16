const service = require('../services');

const getTranscription = async (req, res) => {
  const transcription = await service.getTranscription();
  return res.status(200).json(transcription);
};

const getAudio = async (req, res) => {
  const answer = req.file
  return res.status(200).json(answer)
}

module.exports = { getTranscription, getAudio };
