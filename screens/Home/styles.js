import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#130f40',
  },
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

export default styles;
