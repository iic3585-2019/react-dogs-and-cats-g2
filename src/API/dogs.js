import axios from 'axios';
import { random } from 'lodash';

const BREEDS_URI = 'https://dog.ceo/api/breeds/list/all';
const RANDOM_IMAGES_URI = 'https://dog.ceo/api/breeds/image/random/';
const BREED_IMAGES_URI = 'https://dog.ceo/api/breed/';

const getAllDogsBreeds = async () => {
  const breeds = await axios.get(BREEDS_URI);
  return breeds;
};

const getRandomDogsImages = async quantity => {
  const images = await axios.get(RANDOM_IMAGES_URI + quantity);
  return images;
};

const getAllDogsBreedImages = async breed => {
  const images = await axios.get(`${BREED_IMAGES_URI + breed}/images`);
  return images;
};

const getRandomDogsBreedImages = async (breed, quantity) => {
  const images = await axios.get(`${BREED_IMAGES_URI + breed}/images/random/${quantity}`);
  return images;
};

const getDog = async () => {
  const type = 'dog';
  const breedsApi = await getAllDogsBreeds();
  const breeds = Object.keys(breedsApi.data.message);
  const randomNumber = random(breeds.length - 1);
  const breed = breeds[randomNumber];
  const dog = await axios.get(`${BREED_IMAGES_URI + breed}/images/random`);
  const image = dog.data.message;
  return { type, breed, image };
};

const getSubBreeds = async breed => {
  const subBreeds = await axios.get(`${BREED_IMAGES_URI + breed}/list`);
  return subBreeds;
};

const getAllSubBreedImages = async (breed, subBreed) => {
  const images = await axios.get(`${BREED_IMAGES_URI + breed}/${subBreed}/images`);
  return images;
};

const getRandomSubBreedImages = async (breed, subBreed, quantity) => {
  const images = await axios.get(
    `${BREED_IMAGES_URI + breed}/${subBreed}/images/random/${quantity}`,
  );
  return images;
};

export {
  getAllDogsBreeds,
  getRandomDogsImages,
  getAllDogsBreedImages,
  getRandomDogsBreedImages,
  getSubBreeds,
  getAllSubBreedImages,
  getRandomSubBreedImages,
  getDog,
};
