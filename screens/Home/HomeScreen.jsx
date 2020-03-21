import * as React from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { BASE_URL, SCHEMA } from '../../constants/Api';
import styles from './styles';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = React.useState([]);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    // Get raw categories
    (async function getCategories() {
      try {
        const response = await fetch(`${BASE_URL}?${SCHEMA}`);
        const responseJson = await response.json();
        transformCategories(responseJson);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingComplete(true);
      }
    })();

    // Set options for header navigation
    navigation.setOptions({ title: 'Moonwars' });
  }, []);

  // Transform raw categories into formatted categories
  const transformCategories = categories => {
    const transformedCategories = [];
    let id = 1;
    for (const prop in categories) {
      const imgPath =
        prop === 'people'
          ? require('../../assets/images/people.png')
          : prop === 'planets'
          ? require('../../assets/images/planets.png')
          : prop === 'films'
          ? require('../../assets/images/films.png')
          : prop === 'species'
          ? require('../../assets/images/species.png')
          : prop === 'vehicles'
          ? require('../../assets/images/vehicles.png')
          : require('../../assets/images/starships.png');
      const item = {
        id: `${id}`,
        name: prop,
        imgPath,
        url: categories[prop],
      };
      id++;
      transformedCategories.push(item);
    }
    // Set categories state with transformed categories
    setCategories(transformedCategories);
    console.log(transformedCategories);
  };

  // Navigate to category page
  const navigateToCategory = (name, url) => {
    const categoryList = `${name.charAt(0).toUpperCase()}${name.slice(1)}List`;
    navigation.navigate(categoryList, { name, url });
  };

  // Total number of columns for categories
  const numColumns = 2;

  return (
    <SafeAreaView style={styles.container}>
      {!isLoadingComplete ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={categories} // Get data from categories state
          renderItem={({ item }) => (
            <Item name={item.name} imgPath={item.imgPath} url={item.url} onPressItem={navigateToCategory} />
          )}
          keyExtractor={item => item.id}
          numColumns={numColumns}
        />
      )}
    </SafeAreaView>
  );
}

// Item component rendered by FlatList
const Item = ({ name, imgPath, url, onPressItem }) => (
  <TouchableOpacity style={styles.catContainer} onPress={() => onPressItem(name, url)}>
    <View style={styles.catWrapper}>
      <Image source={imgPath} style={styles.catImage} />
      <Text style={styles.catText}>{name}</Text>
    </View>
  </TouchableOpacity>
);
