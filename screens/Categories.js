import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BASE_URL, SCHEMA } from '../constants/Api';

export default function Categories({ navigation }) {
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
  }, []);

  // Transform raw categories into formatted categories
  const transformCategories = categories => {
    const transformedCategories = [];
    let id = 1;
    for (const prop in categories) {
      const item = {
        id: `${id}`,
        title: prop,
        //imgPath: require(`../assets/images/${title}.svg`),
        imgPath: require('../assets/images/planets.svg'),
        url: categories[prop],
      };
      id++;
      transformedCategories.push(item);
    }
    // Set categories state with transformed categories
    setCategories(transformedCategories);
  };

  // Navigate to category page
  const navigateToCategory = (title, url) => {
    navigation.navigate('Category', { title, url });
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
            <Item title={item.title} imgPath={item.imgPath} url={item.url} onPressItem={navigateToCategory} />
          )}
          keyExtractor={item => item.id}
          numColumns={numColumns}
        />
      )}
    </SafeAreaView>
  );
}

// Item component rendered by FlatList
const Item = ({ title, imgPath, url, onPressItem }) => (
  <TouchableOpacity style={styles.catContainer} onPress={() => onPressItem(title, url)}>
    <View style={styles.catWrapper}>
      <Image source={imgPath} style={styles.catImage} />
      <Text style={styles.catText}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#130f40',
  },
  catContainer: {
    flex: 1,
    margin: 10,
  },
  catWrapper: {
    borderColor: '#d6d7da',
    padding: 15,
    backgroundColor: '#fff',
  },
  catImage: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  catText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
