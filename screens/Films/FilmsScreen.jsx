import * as React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { SCHEMA } from '../../constants/Api';
import styles from './styles';

export default function FilmsScreen({ navigation, route }) {
  const [films, setFilms] = React.useState([]);
  const [relatedPeople, setRelatedPeople] = React.useState([]);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { title, url } = route.params;

  // Set name for selected category
  const titleCapitalized = title.charAt(0).toUpperCase() + title.slice(1);

  navigation.setOptions({
    headerTitle: titleCapitalized,
  });

  React.useEffect(() => {
    // Get films by selected category
    (async function() {
      try {
        const response = await fetch(`${url}?${SCHEMA}`);
        const responseJson = await response.json();
        const data = [responseJson];
        setFilms(data);
        fetchRelatedPeople(data[0].characters);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  // Fetch related people of selected films
  const fetchRelatedPeople = urls => {
    // map every url to promise of fetch
    let requests = urls.map(url =>
      fetch(url)
        .then(response => response.json())
        .then(responseJson => responseJson),
    );

    // Wait until all jobs are resolved
    Promise.all(requests).then(responses => setRelatedPeople(responses));
  };

  // Navigate to people page
  const navigateToPeople = (name, url) => {
    navigation.push(`People`, {
      name,
      url,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoadingComplete ? (
        <ActivityIndicator />
      ) : (
        <React.Fragment>
          {films.map(item => (
            <React.Fragment key={item.title}>
              {/* START films container */}
              <View style={styles.detailContainer}>
                {/* films container title */}
                <Text style={styles.bigText}>{item.title}</Text>
                <View style={styles.line} />

                {/* START films attribute container */}
                <View style={styles.detailAttrContainer}>
                  {/* START films attribute top container */}
                  <ScrollView style={styles.detailAttrTop}>
                    <Text style={styles.smallText}>{item.opening_crawl}</Text>
                  </ScrollView>
                  {/* END films attribute top container */}
                  {/* START films attribute bottom container */}
                  <View style={styles.detailAttrBottom}>
                    <View style={styles.detailAttrLabel}>
                      {/* Attribute labels */}
                      <Text style={styles.smallText}>Release</Text>
                      <Text style={styles.smallText}>Episode</Text>
                      <Text style={styles.smallText}>Director</Text>
                      <Text style={styles.smallText}>Producer</Text>
                    </View>
                    <View style={styles.detailAttrValue}>
                      {/* Attribute values */}
                      <Text style={styles.smallText}>: {item.release_date}</Text>
                      <Text style={styles.smallText}>: {item.episode_id}</Text>
                      <Text style={styles.smallText}>: {item.director}</Text>
                      <Text style={styles.smallText}>: {item.producer}</Text>
                    </View>
                  </View>
                  {/* END films attribute bottom container */}
                </View>
                {/* END films attribute container */}
              </View>
              {/* END films container */}

              {/* START more container */}
              <View style={styles.moreContainer}>
                {/* more container title */}
                <Text style={styles.bigText}>People</Text>
                <View style={styles.line} />

                {/* more container data */}
                <ScrollView>
                  {relatedPeople.map(item => (
                    <Text
                      key={item.name}
                      onPress={() => navigateToPeople(item.name, item.url)}
                      style={styles.smallText}
                    >
                      {item.name}
                    </Text>
                  ))}
                </ScrollView>
              </View>
              {/* END more container */}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </SafeAreaView>
  );
}
