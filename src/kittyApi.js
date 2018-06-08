export const getKittyDataById = async (kittyId) => {
  let kittyData;
  let kittyDataEndpoint = `https://wt-f8af72159b229d5a895848a643ddf7bf-0.sandbox.auth0-extend.com/kitty-image-to-base64?kittyId=${kittyId}`;

  await fetch(kittyDataEndpoint)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response);
      }

      return response.json();
    })
    .then(function(json) {
      kittyData = json;
    })
    .catch(function(error) {
      kittyData = {
        id: kittyId,
        name: null,
        bio: null,
        imageUrl: null,
        imageExtension: null,
        imageData: null,
      };
    });

  return kittyData;
}
