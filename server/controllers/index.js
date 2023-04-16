const service = require('../services')

const getAudio = async (req, res) => {
    const audio = await service.getAudio()
    return res.status(200).json(audio)
}

module.exports = { getAudio }