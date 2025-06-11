const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const PINATA_JWT = `Bearer ${process.env.PINATA_JWT}`; // Loaded from .env

async function uploadToPinata(filePath) {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  const response = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        Authorization: PINATA_JWT,
      },
    }
  );

  fs.unlinkSync(filePath); // Clean up the file after upload
  const ipfsHash = response.data.IpfsHash;
  const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  return { ipfsHash, ipfsUrl };
}

module.exports = { uploadToPinata };
