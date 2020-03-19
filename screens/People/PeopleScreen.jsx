import * as React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { SCHEMA } from '../../constants/Api';
import styles from './styles';

export default function PeopleScreen({ navigation, route }) {
  const [detail, setDetail] = React.useState([]);
  const [relatedSpecies, setRelatedSpecies] = React.useState([]);
  const [relatedPlanets, setRelatedPlanets] = React.useState([]);
  const [relatedFilms, setRelatedFilms] = React.useState([]);
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
        fetchRelatedSpecies(data[0].species);
        fetchRelatedPlanets(data[0].homeworld);
        fetchRelatedFilms(data[0].films);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  // Fetch related species of selected detail
  const fetchRelatedSpecies = urls => {
    // map every url to promise of fetch
    let requests = urls.map(url =>
      fetch(url)
        .then(response => response.json())
        .then(responseJson => responseJson),
    );

    // Wait until all jobs are resolved
    Promise.all(requests).then(responses => setRelatedSpecies(responses));
  };

  // Fetch related planets of selected detail
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

  // Fetch related films of selected detail
  const fetchRelatedFilms = urls => {
    // map every url to promise of fetch
    let requests = urls.map(url =>
      fetch(url)
        .then(response => response.json())
        .then(responseJson => responseJson),
    );

    // Wait until all jobs are resolved
    Promise.all(requests).then(responses => setRelatedFilms(responses));
  };

  // Navigate to other page
  const navigateToFilms = (name, url) => {
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
                    <Text style={styles.smallText}>Gender</Text>
                    <Text style={styles.smallText}>Birth</Text>
                    <Text style={styles.smallText}>Height</Text>
                    <Text style={styles.smallText}>Mass</Text>
                    <Text style={styles.smallText}>Hair color</Text>
                    <Text style={styles.smallText}>Skin color</Text>
                    <Text style={styles.smallText}>Eye color</Text>
                  </View>
                  <View style={styles.detailAttrValue}>
                    {/* Attribute values */}
                    <Text style={styles.smallText}>: {item.gender}</Text>
                    <Text style={styles.smallText}>: {item.birth_year}</Text>
                    <Text style={styles.smallText}>: {item.height}</Text>
                    <Text style={styles.smallText}>: {item.mass}</Text>
                    <Text style={styles.smallText}>: {item.hair_color}</Text>
                    <Text style={styles.smallText}>: {item.skin_color}</Text>
                    <Text style={styles.smallText}>: {item.eye_color}</Text>
                  </View>
                </View>
                {/* END detail attribute container */}
              </View>
              {/* END detail container */}

              <View style={styles.moreContainer}>
                {/* START more container species */}
                <View style={styles.moreContainerLeft}>
                  {/* more container title */}
                  <Text style={styles.bigText}>Species</Text>
                  <View style={styles.line} />

                  {/* more container data */}
                  <ScrollView>
                    {relatedSpecies.map(item => (
                      <Text key={item.name} style={styles.smallText}>
                        {item.name}
                      </Text>
                    ))}
                  </ScrollView>
                </View>
                {/* END more container species */}

                {/* START more container planets */}
                <View style={styles.moreContainerRight}>
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
              </View>

              {/* START more container films */}
              <View style={styles.moreContainerFlex}>
                {/* more container title */}
                <Text style={styles.bigText}>Films</Text>
                <View style={styles.line} />

                {/* more container data */}
                <ScrollView>
                  {relatedFilms.map(item => (
                    <Text
                      key={item.title}
                      onPress={() => navigateToFilms(item.title, item.url)}
                      style={styles.smallText}
                    >
                      {item.title}
                    </Text>
                  ))}
                </ScrollView>
              </View>
              {/* END more container films */}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </SafeAreaView>
  );
}
