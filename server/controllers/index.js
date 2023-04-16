const service = require('../services');

const getTranscription = async (req, res) => {
  const transcription = await service.getTranscription();
  return res.status(200).json(transcription);
};

module.exports = { getTranscription };
