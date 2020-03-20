import * as React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { SCHEMA } from '../../constants/Api';
import styles from './styles';

export default function PeopleListScreen({ navigation, route }) {
  const [peopleList, setPeopleList] = React.useState([]);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { name, url } = route.params;

  // Set name for selected category
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  navigation.setOptions({
    headerTitle: nameCapitalized,
  });

  React.useEffect(() => {
    // Get people list by selected category
    (async function() {
      try {
        const response = await fetch(`${url}?${SCHEMA}`);
        const responseJson = await response.json();
        const { results } = responseJson;
        setPeopleList(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  // Navigate to people page
  const navigateToPeople = (name, url) => {
    navigation.navigate(`${nameCapitalized}`, {
      name,
      url,
    });
  };

  // Total number of columns for people list
  const numColumns = 1;

  return (
    <SafeAreaView style={styles.container}>
      {!isLoadingComplete ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={peopleList} // Get data from people list state
          renderItem={({ item }) => <Item name={item.name} url={item.url} onPressItem={navigateToPeople} />}
          ItemSeparatorComponent={() => <ItemSeparator />}
          keyExtractor={item => item.name}
          numColumns={numColumns}
        />
      )}
    </SafeAreaView>
  );
}

// Item component rendered by FlatList
const Item = ({ name, url, onPressItem }) => (
  <TouchableOpacity style={styles.catContainer} onPress={() => onPressItem(name, url)}>
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
