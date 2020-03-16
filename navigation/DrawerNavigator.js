import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Categories from '../screens/Categories';
import Category from '../screens/Category';

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function DrawerNavigator({ navigation, route }) {
  // Set navigation title
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
  });
  return (
    <Drawer.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Drawer.Screen name="Home" component={Categories} />
      <Drawer.Screen name="Category" component={Category} />
    </Drawer.Navigator>
  );
}

const getHeaderTitle = route => {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Moonwars';
    case 'Category':
      return 'Category';
  }
};
