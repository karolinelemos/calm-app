var menuModuleFactory = function menuModuleFactory(React, ReactNative) {
  var model = require('./makeModel')(React);
  var styles = require('./makeStyles')(ReactNative);

  var config = { model: model, styles: styles };

  return {
    Menu: require('./makeMenu')(React, ReactNative, config),
    MenuContext: require('./makeMenuContext')(React, ReactNative, config),
    MenuOptions: require('./makeMenuOptions')(React, ReactNative, config),
    MenuOption: require('./makeMenuOption')(React, ReactNative, config),
    MenuTrigger: require('./makeMenuTrigger')(React, ReactNative, config)
  };
};

module.exports = menuModuleFactory;