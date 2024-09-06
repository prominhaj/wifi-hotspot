import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Supported image types
const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// Function to stream upload to Cloudinary
const streamUpload = (fileStream, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: `wifi-hotspot-app/${folder}`,
                resource_type: 'image',
                unique_filename: true
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        fileStream.pipe(uploadStream);
    });
};

// File uploader with image type validation
export const fileUploader = async (formData, fileName, folder, oldPublicId = null) => {
    try {
        const file = formData.get(fileName);

        if (!file) throw new Error('File not provided');

        // Validate file type
        if (!validImageTypes.includes(file.type)) {
            throw new Error('Unsupported image type. Allowed types: JPEG, PNG, GIF, WebP');
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileStream = new Readable();
        fileStream._read = () => {};
        fileStream.push(buffer);
        fileStream.push(null);

        const uploadResult = await streamUpload(fileStream, folder);

        // Delete old file if public ID is provided
        if (oldPublicId) {
            await cloudinary.uploader.destroy(oldPublicId, { resource_type: 'image' });
        }

        return uploadResult;
    } catch (error) {
        throw new Error(`File upload failed: ${error.message}`);
    }
};

// File deletion function
export const deleteFile = async (publicId, resourceType = 'image') => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
        return result;
    } catch (error) {
        throw new Error(`File delete failed: ${error.message}`);
    }
};
