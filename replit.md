# BoxEat - Digital Canteen Application

## Overview
BoxEat is a React Native Expo application that provides a digital canteen experience. Users can browse weekly menus, add items to their cart, and complete checkout. The app is built with React Native and uses Expo for cross-platform development.

## Project Architecture

### Technology Stack
- **Framework**: React Native with Expo (~51.0.0)
- **Navigation**: React Navigation (native-stack)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Platform**: Web (via react-native-web)

### Directory Structure
```
/
├── src/
│   ├── screens/          # Application screens
│   │   ├── HomeScreen.js       # Landing page with welcome message
│   │   ├── MenuScreen.js       # Weekly menu display
│   │   ├── CartScreen.js       # Shopping cart
│   │   └── CheckoutScreen.js   # Payment screen
│   ├── store/            # State management
│   │   └── cart.store.js       # Zustand cart store
│   ├── services/         # API services
│   │   └── api.js              # Axios instance
│   └── theme.js          # Color theme definitions
├── App.js               # Main application entry with navigation
├── app.json            # Expo configuration
└── package.json        # Dependencies and scripts
```

## Recent Changes (October 27, 2025)

### GitHub Import Setup
- Fixed nested directory structure issue (files were incorrectly nested under `src/screens/src/screens/...`)
- Reorganized all source files to proper locations
- Installed web dependencies: `react-dom@18.2.0`, `react-native-web`, `@expo/metro-runtime`
- Installed React Navigation dependencies: `react-native-safe-area-context`, `react-native-screens`
- Created `app.json` for Expo configuration (removed asset requirements to avoid build errors)
- Configured web script to run on port 5000: `EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 expo start --web --port 5000`
- Set up "Expo Web Server" workflow for development
- Configured deployment for autoscale with `npm run web`

## Development

### Running the Application
The app runs automatically via the "Expo Web Server" workflow on port 5000. To manually start:
```bash
npm run web
```

### Available Scripts
- `npm start` - Start Expo development server
- `npm run web` - Start web version on port 5000
- `npm run android` - Run on Android (requires Android Studio)
- `npm run ios` - Run on iOS (requires Xcode/macOS)

### Environment
- **Host**: 0.0.0.0 (configured via EXPO_DEVTOOLS_LISTEN_ADDRESS)
- **Port**: 5000
- **Development URL**: Available in Replit webview

## Features

### Implemented Screens
1. **Home Screen** (`HomeScreen.js`)
   - Welcome message: "Bonjour 👋"
   - Description of the digital canteen service
   - Button to view weekly menu

2. **Menu Screen** (`MenuScreen.js`)
   - Displays "Menu de la semaine 🍽️"
   - (Menu items to be implemented)

3. **Cart Screen** (`CartScreen.js`)
   - Shows "Mon panier 🛒"
   - (Cart functionality to be implemented)

4. **Checkout Screen** (`CheckoutScreen.js`)
   - Shows "Paiement 💳"
   - (Payment integration to be implemented)

### State Management
- Uses Zustand for cart state management
- Cart store provides: `add`, `remove`, `clear`, `total` methods

### API Configuration
- Base URL configured as `https://api.boxeat.app` (placeholder)
- Uses Axios for HTTP requests

## Color Theme
```javascript
{
  green: '#3FAE49',
  orange: '#F47C20',
  gray: '#F4F4F4',
  text: '#1A1A1A',
  white: '#FFFFFF'
}
```

## Deployment
Configured for Replit autoscale deployment. The app will run the development server in production (suitable for demos/prototypes). For production use, consider building a static export with `expo export:web`.

## Notes
- The app is in French language
- Package versions have some compatibility warnings with Expo 51, but the app functions correctly
- Empty asset files were removed to prevent build errors
- API endpoint is a placeholder and should be replaced with actual backend