import * as React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCHEMA } from '../constants/Api';

export default function Detail({ navigation, route }) {
  const [detail, setDetail] = React.useState([]);
  const [relatedData, setRelatedData] = React.useState([]);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { url } = route.params;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#130f40',
  },
  detailContainer: {
    flex: 1,
    margin: 10,
  },
  detail: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#fff',
    width: '100%',
  },
  detailText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
  },
});
