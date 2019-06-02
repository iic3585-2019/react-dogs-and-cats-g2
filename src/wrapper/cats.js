import axios from 'axios';
import { random } from 'lodash';

const API_KEY = '989d41c5-a55c-4005-87c4-4f8268cac8de';
const BREEDS_URI = 'https://api.thecatapi.com/v1/breeds';
const RANDOM_IMAGES_URI = 'https://api.thecatapi.com/v1/images/search/?limit=';
const BREED_IMAGES_URI =
  'https://api.thecatapi.com/v1/images/search/?breed_id=';

const getAllCatsBreeds = async () => {
  const breeds = await axios.get(BREEDS_URI, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return breeds;
};

const getRandomCatsImages = async quantity => {
  const images = await axios.get(RANDOM_IMAGES_URI + quantity, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return images;
};

const getRandomCatsBreedImages = async (breed, quantity) => {
  const images = await axios.get(
    BREED_IMAGES_URI + breed + '&limit=' + quantity,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  );
  return images;
};

const getCat = async () => {
  const breeds = await getAllCatsBreeds();
  const randomNumber = random(breeds.data.length - 1);
  const breedInfo = breeds.data[randomNumber];
  const cat = await axios.get(BREED_IMAGES_URI + breedInfo.id + '&limit=' + 1, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  const image = cat.data[0].url;
  const breed = breedInfo.name;
  return { breed, image };
};

export {
  getAllCatsBreeds,
  getRandomCatsImages,
  getRandomCatsBreedImages,
  getCat,
};
