// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// Ne fais AUCUN alias "react-native" -> "react-native-web"
module.exports = config;
