# Contexto

Para esta aplicación decidimos hacer una idea parecida a Tinder pero enfocadas en perros y gatos, de esta forma al aparecer una imagen de alguna de las dos api cargadas puedes desplazar a izquierda o derecha, si te gusto o no. Esta funcionalidad es solo para movil, pero se puede probar con el formato celular al inspeccionar elementos en el navegador.

Además los perros y gatos pueden darle like tambien, lo que ocasiona un match y para cambiar las probabilidades de match se puede cambiar caracteristicas buscadas como cantidad de alimento que se le dará o cantidad de veces que se dejará solo, etc.

# Partes interesantes del codigo

Lo interesante del codigo principalmente fue el uso de dos apis distintas logrando adaptar lo que regresaban ambas y de esta forma obtener lo que realmente se queria. Esto se ve reflejado en el codigo

```
import { random } from 'lodash';
import { getDog } from './dogs';
import { getCat } from './cats';

const getPet = async () => {
  const getters = [getDog, getCat];

  return getters[random(1)]();
};

export default getPet;

```

y por ultimo lo otro interesante es el cambio de probabilidad para obtener un match, que se puede ver reflejado en el siguiente codigo

```
onRightSwipe = async feedItem => {
const { profile: { mealsPerDay, weeklyWalks, hoursAlone } } = this.props;
const { feed } = this.state;

let x;
switch (feedItem.type) {
    case 'dog':
    x = (mealsPerDay - 3) + (weeklyWalks - 5) - (hoursAlone - 8);
    break;
    case 'cat':
    x = (mealsPerDay - 6) - (weeklyWalks - 2) + (hoursAlone - 10);
    break;
    default:
    x = 0;
}
const heLikesYou = Math.random() <= toProbability(x);

// eslint-disable-next-line no-console
console.log(`x: ${x}`, `p: ${toProbability(x)}`, heLikesYou);
```

## Requisitos

Para inicializar la aplicación se necesita tener instalado `yarn` y luego ejecutar

```
yarn install
```

para instalar las dependencias.

Finalmente para usar la aplicación simplemente se debe ejecutar

```
yarn start
```

y la aplicación estará en `http://localhost:3000/`
