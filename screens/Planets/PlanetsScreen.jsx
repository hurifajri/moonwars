import * as React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { SCHEMA } from '../../constants/Api';
import styles from './styles';

export default function PlanetsScreen({ navigation, route }) {
  const [detail, setDetail] = React.useState([]);
  const [relatedPeople, setRelatedPeople] = React.useState([]);
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
        fetchRelatedPeople(data[0].residents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  // Fetch related data of selected detail
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

  // Navigate to other page
  const navigateToPeople = (name, url) => {
    navigation.push(`Films`, {
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
                  <View style={styles.detailAttrLabel}>
                    {/* Attribute labels */}
                    <Text style={styles.smallText}>Population</Text>
                    <Text style={styles.smallText}>Rotation</Text>
                    <Text style={styles.smallText}>Orbital</Text>
                    <Text style={styles.smallText}>Diameter</Text>
                    <Text style={styles.smallText}>Surface</Text>
                    <Text style={styles.smallText}>Climate</Text>
                    <Text style={styles.smallText}>Gravity</Text>
                    <Text style={styles.smallText}>Terrain</Text>
                  </View>
                  <View style={styles.detailAttrValue}>
                    {/* Attribute values */}
                    <Text style={styles.smallText}>: {item.population}</Text>
                    <Text style={styles.smallText}>: {item.rotation_period}</Text>
                    <Text style={styles.smallText}>: {item.orbital_period}</Text>
                    <Text style={styles.smallText}>: {item.diameter}</Text>
                    <Text style={styles.smallText}>: {item.surface_water}</Text>
                    <Text style={styles.smallText}>: {item.climate}</Text>
                    <Text style={styles.smallText}>: {item.gravity}</Text>
                    <Text style={styles.smallText}>: {item.terrain}</Text>
                  </View>
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
