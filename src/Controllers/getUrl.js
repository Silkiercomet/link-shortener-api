const model = require('../Models/Link_shortener')

const getOriginalUrl = async (req, res) => {
    const { shortUrl } = req.params;

    if (!shortUrl) {
        return res.status(400).json({ error: 'URL corta es requerida' });
    }

    try {
        // Buscar el enlace por shortUrl

        const link = await model.findOne({ shortUrl });

        if (!link) {
            return res.status(404).json({ error: 'Enlace no encontrado' });
        }


        // Incrementar el contador de visitas
        link.visits += 1;
        await link.save();

        // Redirigir a la URL original
        return res.status(201).json({ originalUrl: link.originalUrl });
    } catch (error) {
        console.error('Error al obtener la URL original:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}



module.exports = getOriginalUrl;
// Este controlador maneja la obtención de la URL original a partir de la URL corta