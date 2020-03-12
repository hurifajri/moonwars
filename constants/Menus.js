const myObj = {
  people: 'https://swapi.co/api/people/',
  planets: 'https://swapi.co/api/planets/',
  films: 'https://swapi.co/api/films/',
  species: 'https://swapi.co/api/species/',
  vehicles: 'https://swapi.co/api/vehicles/',
  starships: 'https://swapi.co/api/starships/',
};

let menus = [];
let id = 1;
for (const prop in myObj) {
  const item = {
    id: `${id}`,
    title: prop,
    imgPath: require(`../assets/images/${prop}.svg`),
    url: myObj[prop],
  };
  id++;
  menus.push(item);
}

export default menus;
