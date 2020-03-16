import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Item({ name }) {
  return (
    <TouchableOpacity style={styles.clickableContainer}>
      <View style={styles.catContainer}>
        <Text style={styles.catText}>{name}</Text>
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
