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
  if (buffer) {
    const input = './audios/input.mp3';
    const output = './audios/output.mp3';
    await writeFileAsync(input, buffer);
    const ffmpegCommand = ffmpeg();
    ffmpegCommand.input(input);
    ffmpegCommand.audioFilter('highpass=f=200, lowpass=f=3000');
    ffmpegCommand.format('mp3');
    ffmpegCommand.output(output);

    await ffmpegCommand.run();

    try {
      const transcription = await service.transcriptFromClient(output);
      return res.status(200).json({ transcription });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  return res.status(500).json({ error: 'Buffer undefined' });
};

module.exports = { getTranscription, getAudio };
