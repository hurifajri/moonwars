import * as React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { BASE_URL, SCHEMA } from '../constants/Api';
import Item from './CategoryItem';

export default function Category({ route }) {
  const [category, setCategory] = React.useState([]);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    const { title } = route.params;

    // Get category by title
    (async function getCategoryByTitle() {
      try {
        let response = await fetch(`${BASE_URL}${title}/?${SCHEMA}`);
        let responseJson = await response.json();
        const { results } = responseJson;
        setCategory(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  // Total number of columns for category
  const numColumns = 2;

  return (
    <SafeAreaView style={styles.container}>
      {!isLoadingComplete ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={category} // Get data from category state
          renderItem={({ item }) => <Item name={item.name} />}
          keyExtractor={item => item.name}
          numColumns={numColumns}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#130f40',
  },
});
