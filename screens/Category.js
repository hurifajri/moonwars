import * as React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCHEMA } from '../constants/Api';

export default function Category({ navigation, route }) {
  const [category, setCategory] = React.useState([]);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { title, url } = route.params;

  React.useEffect(() => {
    // Get category by title
    (async function getCategoryByTitle() {
      try {
        const response = await fetch(`${url}?${SCHEMA}`);
        const responseJson = await response.json();
        const { results } = responseJson;
        setCategory(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  // Navigate to detail page
  const navigateToDetail = url => {
    navigation.navigate('Detail', { url });
  };

  // Total number of columns for category
  const numColumns = 1;

  // Computed key based on category which is selected
  const key = title === 'films' ? 'title' : 'name';

  return (
    <SafeAreaView style={styles.container}>
      {!isLoadingComplete ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={category} // Get data from category state
          renderItem={({ item }) => <Item name={item[key]} url={item.url} onPressItem={navigateToDetail} />}
          ItemSeparatorComponent={() => <ItemSeparator />}
          keyExtractor={item => item[key]}
          numColumns={numColumns}
        />
      )}
    </SafeAreaView>
  );
}

// Item component rendered by FlatList
const Item = ({ name, url, onPressItem }) => (
  <TouchableOpacity style={styles.catContainer} onPress={() => onPressItem(url)}>
    <View style={styles.catWrapper}>
      <Text style={styles.catText}>{name}</Text>
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
    flexDirection: 'row',
    padding: 15,
  },
  catText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
