import * as React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { SCHEMA } from '../../constants/Api';
import styles from './styles';

export default function SpeciesScreen({ navigation, route }) {
  const [species, setSpecies] = React.useState([]);
  const [relatedPlanets, setRelatedPlanets] = React.useState([]);
  const [relatedPeople, setRelatedPeople] = React.useState([]);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { name, url } = route.params;

  // Set name for selected category
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  navigation.setOptions({
    headerTitle: nameCapitalized,
  });

  React.useEffect(() => {
    // Get species by selected category
    (async function() {
      try {
        const response = await fetch(`${url}?${SCHEMA}`);
        const responseJson = await response.json();
        const data = [responseJson];
        setSpecies(data);
        fetchRelatedPlanets(data[0].homeworld);
        fetchRelatedPeople(data[0].people);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  // Fetch related planets of selected species
  const fetchRelatedPlanets = async url => {
    try {
      const response = await fetch(`${url}?${SCHEMA}`);
      const responseJson = await response.json();
      const data = [responseJson];
      setRelatedPlanets(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch related people of selected species
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
          {species.map(item => (
            <React.Fragment key={item.name}>
              {/* START species container */}
              <View style={styles.detailContainer}>
                {/* species container title */}
                <Text style={styles.bigText}>{item.name}</Text>
                <View style={styles.line} />

                {/* START species attribute container */}
                <View style={styles.detailAttrContainer}>
                  <View style={styles.detailAttrLabel}>
                    {/* Attribute labels */}
                    <Text style={styles.smallText}>Classification</Text>
                    <Text style={styles.smallText}>Designation</Text>
                    <Text style={styles.smallText}>Avg. Height</Text>
                    <Text style={styles.smallText}>Skin Colors</Text>
                    <Text style={styles.smallText}>Hair Colors</Text>
                    <Text style={styles.smallText}>Eye Colors</Text>
                    <Text style={styles.smallText}>Avg. Lifespan</Text>
                    <Text style={styles.smallText}>Language</Text>
                  </View>
                  <View style={styles.detailAttrValue}>
                    {/* Attribute values */}
                    <Text style={styles.smallText}>: {item.classification}</Text>
                    <Text style={styles.smallText}>: {item.designation}</Text>
                    <Text style={styles.smallText}>: {item.average_height}</Text>
                    <Text style={styles.smallText}>: {item.skin_colors}</Text>
                    <Text style={styles.smallText}>: {item.hair_colors}</Text>
                    <Text style={styles.smallText}>: {item.eye_colors}</Text>
                    <Text style={styles.smallText}>: {item.average_lifespan}</Text>
                    <Text style={styles.smallText}>: {item.language}</Text>
                  </View>
                </View>
                {/* END species attribute container */}
              </View>
              {/* END species container */}

              {/* START more container planets */}
              <View style={styles.moreContainer}>
                {/* more container title */}
                <Text style={styles.bigText}>Planets</Text>
                <View style={styles.line} />

                {/* more container data */}
                <ScrollView>
                  {relatedPlanets.map(item => (
                    <Text key={item.name} style={styles.smallText}>
                      {item.name}
                    </Text>
                  ))}
                </ScrollView>
              </View>
              {/* END more container planets */}

              {/* START more container people */}
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
              {/* END more container people */}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </SafeAreaView>
  );
}
