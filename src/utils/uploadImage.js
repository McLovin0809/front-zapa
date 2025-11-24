import Resizer from 'react-image-file-resizer';

// Tomar la clave desde la variable de entorno
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const uploadToImgBB = async (file) => {
    return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
            file,
            1024,         // maxWidth
            1024,         // maxHeight
            'WEBP',       // format
            80,           // quality
            0,            // rotation
            async (uri) => {  // callback
                try {
                    if (!uri || typeof uri !== 'string') {
                        reject(new Error("Error al procesar imagen"));
                        return;
                    }

                    const base64 = uri.split(',')[1];
                    if (!base64) {
                        reject(new Error("Base64 inválido"));
                        return;
                    }

                    const formData = new FormData();
                    formData.append('image', base64);

                    const response = await fetch(
                        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                        { method: 'POST', body: formData }
                    );

                    const result = await response.json();

                    if (result.success) {
                        resolve({
                            url: result.data.url,
                            preview: uri,
                        });
                    } else {
                        reject(new Error(result.error?.message || "Error al subir"));
                    }
                } catch (err) {
                    reject(err);
                }
            },
            'base64'      // outputType
        );
    });
};
