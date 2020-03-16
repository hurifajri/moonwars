import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Item({ title, imgPath, onPressItem }) {
  return (
    <TouchableOpacity onPress={() => onPressItem(title)} style={styles.clickableContainer} data-title={title}>
      <View style={styles.catContainer}>
        <Image source={imgPath} style={styles.catImage} />
        <Text style={styles.catText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  clickableContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  catContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 15,
    margin: 10,
    backgroundColor: '#fff',
  },
  catImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    padding: 10,
  },
  catText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
