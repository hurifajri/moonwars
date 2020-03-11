import * as React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MENUS } from '../constants/Menus';

export default function HomeScreen() {
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
