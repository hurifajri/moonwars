import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#130f40',
  },
  detailContainer: {
    flex: 1,
    margin: 10,
  },
  detail: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#fff',
    width: '100%',
  },
  detailText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
  },
});

export default styles;
