'use server';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const uploadImage = async (file: File) => {
  try {
    const uploadPromise = await file.arrayBuffer();
    const base64Image = Buffer.from(uploadPromise).toString('base64');

    const uploadResult = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64Image}`
    );

    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
