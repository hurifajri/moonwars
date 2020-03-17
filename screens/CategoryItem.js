import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Item({ name }) {
  return (
    <TouchableOpacity style={styles.catContainer}>
      <View style={styles.catWrapper}>
        <Text style={styles.catText}>{name}</Text>
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
    flexDirection: 'row',
    padding: 15,
  },
  catText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
