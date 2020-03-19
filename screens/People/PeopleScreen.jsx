import * as React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCHEMA } from '../../constants/Api';
import styles from './styles';

export default function PeopleScreen({ navigation, route }) {
  const [detail, setDetail] = React.useState([]);
  const [relatedData, setRelatedData] = React.useState([]);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { name, url } = route.params;

  // Set title for each selected category
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  navigation.setOptions({
    headerTitle: nameCapitalized,
  });

  React.useEffect(() => {
    // Get detail by name
    (async function getDetailByName() {
      try {
        const response = await fetch(`${url}?${SCHEMA}`);
        const responseJson = await response.json();
        const data = [responseJson];
        setDetail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  // Fetch related data of selected detail
  const fetchRelatedData = urls => {
    // map every url to promise of fetch
    let requests = urls.map(url =>
      fetch(url)
        .then(response => response.json())
        .then(responseJson => responseJson),
    );

    // Wait until all jobs are resolved
    Promise.all(requests).then(responses => setRelatedData(responses));
  };

  // Computed key based on category which is selected
  const key = url.includes('films') ? 'title' : 'name';

  return (
    <SafeAreaView style={styles.container}>
      {!isLoadingComplete ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.detailContainer}>
          {detail.map(item => (
            <React.Fragment key={key}>
              <View style={styles.detail}>
                <Text style={styles.detailText}>{item[key]}</Text>
              </View>
              {fetchRelatedData(item.films)}
              {relatedData.map(item => (
                <React.Fragment key={item.title}>
                  <Text style={styles.detailText}>{item.title}</Text>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}
