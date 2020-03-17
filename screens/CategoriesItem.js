import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Item({ title, imgPath, onPressItem }) {
  return (
    <TouchableOpacity style={styles.catContainer} onPress={() => onPressItem(title)} data-title={title}>
      <View style={styles.catWrapper}>
        <Image source={imgPath} style={styles.catImage} />
        <Text style={styles.catText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  catContainer: {
    flex: 1,
    margin: 10,
  },
  catWrapper: {
    borderColor: '#d6d7da',
    padding: 15,
    backgroundColor: '#fff',
  },
  catImage: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  catText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
