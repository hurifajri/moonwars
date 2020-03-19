import { StyleSheet } from 'react-native';

const primaryColor = '#130f40';
const secondaryColor = '#fff';

const styles = StyleSheet.create({
  // Container stylesheets

  // Main containers
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor,
  },
  detailContainer: {
    alignSelf: 'flex-start',
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: secondaryColor,
    margin: 7,
    padding: 10,
    height: 209,
  },
  moreContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignSelf: 'stretch',
    margin: 7,
  },
  moreContainerFlex: {
    flex: 1,
    alignSelf: 'flex-start',
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: secondaryColor,
    margin: 7,
    padding: 10,
  },

  // Part of detail container
  detailAttrContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  // Part of detail attribute container
  detailAttrLabel: {
    flex: 1,
  },
  detailAttrValue: {
    flex: 2,
  },

  // Part of more container
  moreContainerLeft: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: secondaryColor,
    marginRight: 7,
    padding: 10,
  },
  moreContainerRight: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: secondaryColor,
    padding: 10,
  },

  // Text stylesheets
  bigText: {
    fontSize: 20,
    color: secondaryColor,
  },
  smallText: {
    fontSize: 15,
    color: secondaryColor,
  },

  // Misc stylesheets
  line: {
    borderBottomColor: secondaryColor,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default styles;
