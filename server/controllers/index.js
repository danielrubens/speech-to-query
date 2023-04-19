const service = require('../services');

const getTranscription = async (req, res) => {
  const transcription = await service.getTranscription();
  return res.status(200).json(transcription);
};

const getAudio = async (req, res) => {
  const audioData = req.body.audio;
  try {
    const transcription = await service.transcriptFromClient(audioData);
    return res.status(200).json({ transcription });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { getTranscription, getAudio };
