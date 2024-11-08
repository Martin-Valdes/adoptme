import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../config/s3.js';

export const uploadFileToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  const data = await s3Client.send(command);
  return data;
};