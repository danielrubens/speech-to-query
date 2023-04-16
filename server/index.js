const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const controller = require('./controllers');

const upload = multer();

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const { PORT } = process.env;

app.get('/', controller.getTranscription);
app.post('/upload-audio', upload.single('audioFile'), controller.getAudio);

app.listen(PORT, () => console.log(`Project running on port ${PORT}`));
