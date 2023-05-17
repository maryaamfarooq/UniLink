const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'Posts',
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

const uploadProductFile = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.file.tempFilePath,
    {
      use_filename: true,
      folder: 'Files',
      resource_type: 'raw', // Set the resource_type to 'raw' for non-image files
    }
  );
  fs.unlinkSync(req.files.file.tempFilePath);
  return res.status(StatusCodes.OK).json({ file: { src: result.secure_url } });
};

module.exports = {
  uploadProductImage,
  uploadProductFile
};
