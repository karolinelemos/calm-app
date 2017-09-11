module.exports = function (ReactNative) {
  var Dimensions = ReactNative.Dimensions,
      StyleSheet = ReactNative.StyleSheet;

  var window = Dimensions.get('window');

  return StyleSheet.create({
    optionsContainer: {
      position: 'absolute',
      borderRadius: 2,
      backgroundColor: 'white',
      width: 200,

      shadowColor: 'black',
      shadowOpacity: 0.3,
      shadowOffset: { width: 3, height: 3 },
      shadowRadius: 4,

      elevation: 8
    },
    options: {
      flex: 1
    },
    optionsHidden: {
      top: window.height,
      bottom: -window.height
    },
    option: {
      padding: 10,
      backgroundColor: 'transparent',
      flex: 1
    },
    backdrop: {
      opacity: 0,
      position: 'absolute',
      top: window.height,
      bottom: -window.height,
      left: 0
    }
  });
};