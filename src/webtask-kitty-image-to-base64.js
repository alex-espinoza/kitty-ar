'use latest';

import 'babel-polyfill';
import express from 'express';
import { fromExpress } from 'webtask-tools';
import bodyParser from 'body-parser';
import base64 from 'node-base64-image';
import { promisify } from 'util';

bodyParser.urlencoded();

var app = express();
app.use(bodyParser.urlencoded());

var CRYPTO_KITTIES_IMAGE_STORAGE_URL = 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/';

var encode = promisify(base64.encode);

app.get('/', async (request, response) => {
  var kittyId = request.query.kittyId;
  var kittyData = {
    id: kittyId,
    pngUrl: `${CRYPTO_KITTIES_IMAGE_STORAGE_URL}${kittyId}.png`,
    pngData: null,
    svgUrl: `${CRYPTO_KITTIES_IMAGE_STORAGE_URL}${kittyId}.svg`,
    svgData: null
  };
  var base64Options = { string: true };

  try {
    console.log('attempting to get png data');
    var pngImage = await encode(kittyData.pngUrl, base64Options);
    console.log('got data from png');
    kittyData.pngData = await formatBase64ToDataUrl(pngImage, 'png');

  } catch (error) {
    console.log('png not found', error);
  }

  if (kittyData.pngData === null) {
    try {
      console.log('attempting to get svg data');
      var svgImage = await encode(kittyData.svgUrl, base64Options);
      console.log('got data from svg');
      kittyData.svgData = formatBase64ToDataUrl(svgImage, 'svg');

    } catch (error) {
      console.log('svg not found', error);
    }
  }

  return response.json(kittyData);
});

function formatBase64ToDataUrl(base64String, extension) {
  if (extension === 'png') {
    return `data:image/png;base64,${base64String}`;
  } else {
    return `data:image/svg+xml;base64,${base64String}`;
  }
}

module.exports = fromExpress(app);
