import { random } from 'lodash';
import { getDog } from './dogs';
import { getCat } from './cats';

const getPet = async () => {
  const getters = [getDog, getCat];

  return getters[random(1)]();
};

export default getPet;
