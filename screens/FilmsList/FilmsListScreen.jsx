import * as React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { SCHEMA } from '../../constants/Api';
import styles from './styles';

export default function FilmsListScreen({ navigation, route }) {
  const [filmsList, setFilmsList] = React.useState([]);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { name, url } = route.params;

  // Set name for selected category
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  navigation.setOptions({
    headerTitle: nameCapitalized,
  });

  React.useEffect(() => {
    // Get films list by selected category
    (async function() {
      try {
        const response = await fetch(`${url}?${SCHEMA}`);
        const responseJson = await response.json();
        const { results } = responseJson;
        setFilmsList(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  // Navigate to films page
  const navigateToFilms = (title, url) => {
    navigation.navigate(`${nameCapitalized}`, {
      title,
      url,
    });
  };

  // Total number of columns for films list
  const numColumns = 1;

  return (
    <SafeAreaView style={styles.container}>
      {!isLoadingComplete ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filmsList} // Get data from films list state
          renderItem={({ item }) => <Item title={item.title} url={item.url} onPressItem={navigateToFilms} />}
          ItemSeparatorComponent={() => <ItemSeparator />}
          keyExtractor={item => item.title}
          numColumns={numColumns}
        />
      )}
    </SafeAreaView>
  );
}

// Item component rendered by FlatList
const Item = ({ title, url, onPressItem }) => (
  <TouchableOpacity style={styles.catContainer} onPress={() => onPressItem(title, url)}>
    <View style={styles.catWrapper}>
      <Text style={styles.catText}>{title}</Text>
    </View>
  </TouchableOpacity>
);

// Item separator component rendered by Flatlist
const ItemSeparator = () => (
  <View
    style={{
      height: 1,
      width: '100%',
      backgroundColor: '#fff',
    }}
  />
);
