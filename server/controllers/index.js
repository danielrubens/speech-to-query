const service = require('../services')

const getTranscription = async (req, res) => {
    const audio = await service.getTranscription()
    return res.status(200).json(audio)
}

module.exports = { getTranscription }