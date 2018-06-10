'use latest';

import 'babel-polyfill';
import express from 'express';
import { fromExpress } from 'webtask-tools';
import bodyParser from 'body-parser';
import base64 from 'node-base64-image';
import { promisify } from 'util';
import fetch from 'node-fetch';

bodyParser.urlencoded();
const encode = promisify(base64.encode);
const CRYPTO_KITTIES_API_URL = 'https://api.cryptokitties.co/kitties';
const app = express();
app.use(bodyParser.urlencoded());

app.get('/', async (request, response) => {
  const kittyId = request.query.kittyId;

  let kittyData = {
    id: kittyId,
    name: null,
    bio: null,
    imageUrl: null,
    imageExtension: null,
    imageData: null,
    color: null
  };

  try {
    console.log('Attempting to get data from CryptoKitties API...');
    const response = await fetch(`${CRYPTO_KITTIES_API_URL}/${kittyId}`);
    const responseJson = await response.json();
    saveAPIData(kittyData, responseJson);
    console.log('Successfully received data from API!');

  } catch (error) {
    console.log('API returned an error:', error);
    return response.json(kittyData);
  }

  try {
    const base64Options = { string: true };
    console.log('Attempting to get base64 data from kitty image...');
    const base64 = await encode(kittyData.imageUrl, base64Options);
    console.log('Successfully encoded base64 data from kitty image!');
    kittyData.imageData = formatBase64ToDataUrl(base64, kittyData.imageExtension);

  } catch (error) {
    console.log('Kitty image could not be encoded:', error);
  }

  return response.json(kittyData);
});

function saveAPIData(kittyData, responseJson) {
  kittyData.name = responseJson.name;
  kittyData.bio = responseJson.bio;
  kittyData.imageUrl = responseJson.image_url_cdn;
  kittyData.imageExtension = responseJson.image_url_cdn.split('.').pop();
  kittyData.color = responseJson.color;
}

function formatBase64ToDataUrl(base64, extension) {
  if (extension === 'png') {
    return `data:image/png;base64,${base64}`;
  } else {
    return `data:image/svg+xml;base64,${base64}`;
  }
}

module.exports = fromExpress(app);
