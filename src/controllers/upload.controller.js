import { uploadFileToS3 } from '../services/s3Service.js';

export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await uploadFileToS3(file);
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${Date.now()}_${file.originalname}`;
    
    res.json({
      message: 'File uploaded successfully',
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
};
