import * as React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MENUS from '../constants/Menus';
import { BASE_URL, SCHEMA } from '../constants/Api';

export default function HomeScreen() {
  React.useEffect(() => {
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
      button.addEventListener('click', function() {
        const title = this.dataset.title;
        fetch(`${BASE_URL}${title}/?${SCHEMA}`)
          .then(response => response.json())
          .then(response => console.log(response));
      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MENUS}
        renderItem={({ item }) => <Item title={item.title} imgPath={item.imgPath} />}
        keyExtractor={item => item.id}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
}

// Total number of columns for menus
const numColumns = 2;

const Item = ({ title, imgPath }) => {
  return (
    <View style={styles.menuContainer}>
      <Image source={imgPath} style={styles.menuImage} />
      <Text style={styles.menuText}>{title}</Text>
      <button id="menu-button" className="menu-button" data-title={title}>
        {title}
      </button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#130f40',
  },
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 15,
    margin: 10,
    backgroundColor: '#fff',
  },
  menuImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    padding: 10,
  },
  menuText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
