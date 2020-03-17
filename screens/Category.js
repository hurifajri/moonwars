import * as React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { BASE_URL, SCHEMA } from '../constants/Api';
import Item from './CategoryItem';

export default function Category({ route }) {
  const [category, setCategory] = React.useState([]);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { title } = route.params;

  React.useEffect(() => {
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
  const numColumns = 1;

  // Computed key based on category is selected
  const key = title === 'films' ? 'title' : 'name';

  return (
    <SafeAreaView style={styles.container}>
      {!isLoadingComplete ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={category} // Get data from category state
          renderItem={({ item }) => <Item name={item[key]} />}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#fff',
              }}
            />
          )}
          keyExtractor={item => item[key]}
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
    alignContent: 'center',
    backgroundColor: '#130f40',
  },
});
