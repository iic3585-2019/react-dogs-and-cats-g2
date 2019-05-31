import axios from 'axios';

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

export { getAllCatsBreeds, getRandomCatsImages, getRandomCatsBreedImages };
