import { getDog } from './dogs';
import { getCat } from './cats';
import { random } from 'lodash';

const getAnimal = async () => {
  const animals = [getDog, getCat];
  const randomNumber = random(1);
  return animals[randomNumber]();
};

export { getAnimal };
