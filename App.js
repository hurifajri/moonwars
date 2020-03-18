import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from './screens/Home';
import CategoryScreen from './screens/Category';
import PeopleScreen from './screens/People';
import PlanetsScreen from './screens/Planets';
import FilmsScreen from './screens/Films';
import SpeciesScreen from './screens/Species';
import VehiclesScreen from './screens/Vehicles';
import StarshipsScreen from './screens/Starships';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    (async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load initial navigation state
        // setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    })();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Moonwars' }} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="People" component={PeopleScreen} />
            <Stack.Screen name="Planets" component={PlanetsScreen} />
            <Stack.Screen name="Films" component={FilmsScreen} />
            <Stack.Screen name="Species" component={SpeciesScreen} />
            <Stack.Screen name="Vehicles" component={VehiclesScreen} />
            <Stack.Screen name="Starships" component={StarshipsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
