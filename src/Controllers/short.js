const customAlphabet = require('nanoid').customAlphabet
const model = require('../Models/Link_shortener')

const nanoid = customAlphabet('1234567890abcdefijkml', 10)
model.id = nanoid() //=> "4f90d13a42"

// Función para acortar URL

const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;
   if (!isValidUrl(originalUrl)) {
        return res.status(400).json({ error: 'URL original no es válida' });
    }
    if (!originalUrl) {
        return res.status(400).json({ error: 'URL original es requerida' });
    }

    try {
        // Verificar si la URL ya existe
        let link = await model.findOne({ originalUrl });

        if (link) {
            return res.status(200).json(link);
        }

        // Crear un nuevo enlace
        const shortUrl = nanoid();
        link = new model({
            originalUrl,
            shortUrl
        });
        console.log(link,"test1")
        await link.save();
        res.status(201).json(link);
    } catch (error) {
        console.error('Error al acortar la URL:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

module.exports = shortenUrl;