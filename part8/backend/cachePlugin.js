// cachePlugin.js
const crypto = require('crypto');

const etagCachePlugin = {
    async willSendResponse({ request, response, contextValue }) {
        // El hook 'willSendResponse' se ejecuta justo antes de enviar la respuesta.
        // Es el lugar perfecto para nuestra lógica de caché.

        // Solo aplicamos la caché a respuestas exitosas que contienen datos.
        if (
            response.body.kind === 'single' &&
            response.body.singleResult.data
        ) {
            // 1. Calcular el ETag a partir del cuerpo de la respuesta.
            const body = JSON.stringify(response.body.singleResult.data);
            const etag = crypto.createHash('sha1').update(body).digest('hex');

            // 2. Establecer las cabeceras de caché en la respuesta saliente.
            response.http.headers.set('Cache-Control', 'no-cache');
            response.http.headers.set('ETag', etag);

            // 3. Leer la cabecera 'If-None-Match' de la petición entrante.
            // Accedemos a 'req' a través del 'contextValue' que configuraremos más adelante.
            const ifNoneMatch = contextValue.req?.headers['if-none-match'];

            // 4. Comparar ETags y enviar 304 si coinciden.
            if (ifNoneMatch === etag) {
                response.http.status = 304;
                response.body.singleResult.data = null; // El cuerpo de un 304 debe estar vacío.
            }
        }
    },
};

module.exports = etagCachePlugin;
