import * as React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { SCHEMA } from '../../constants/Api';
import styles from './styles';

export default function FilmsScreen({ navigation, route }) {
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
        fetchRelatedData(data[0].characters);
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

  // Navigate to other page
  const navigateToPage = (name, url) => {
    navigation.push(`People`, {
      name,
      url,
    });
  };

  // Computed key based on category which is selected
  const key = url.includes('films') ? 'title' : 'name';

  return (
    <SafeAreaView style={styles.container}>
      {!isLoadingComplete ? (
        <ActivityIndicator />
      ) : (
        <React.Fragment>
          {detail.map(item => (
            <React.Fragment key={key}>
              {/* START detail container */}
              <View style={styles.detailContainer}>
                {/* detail container title */}
                <Text style={styles.bigText}>{item[key]}</Text>
                <View style={styles.line} />

                {/* START detail attribute container */}
                <View style={styles.detailAttrContainer}>
                  {/* START detail attribute top container */}
                  <ScrollView style={styles.detailAttrTop}>
                    <Text style={styles.smallText}>{item.opening_crawl}</Text>
                  </ScrollView>
                  {/* END detail attribute top container */}
                  {/* START detail attribute bottom container */}
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
                  {/* END detail attribute bottom container */}
                </View>
                {/* END detail attribute container */}
              </View>
              {/* END detail container */}

              {/* START more container */}
              <View style={styles.moreContainer}>
                {/* more container title */}
                <Text style={styles.bigText}>People</Text>
                <View style={styles.line} />

                {/* more container data */}
                <ScrollView>
                  {relatedData.map(item => (
                    <Text key={item.name} onPress={() => navigateToPage(item.name, item.url)} style={styles.smallText}>
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
