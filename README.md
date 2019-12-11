# rnative
Frontends (React Native)

## Installation
Must Install Node 10 LTS & Expo

```
npm install -g expo-cli
```

To make project hybrid
```
npm install -S react-scripts react-dom react-native-web react-art react-router-native react-router-dom
```

## Run Server Locally
Run Server and Package manager locally and point to the local QR code from device (Expo App).

```
npm start
```

## Publish
Must have account on expo, Publish JavaScript bundles to expo.

```
expo publish
```

## Builds
iOS, Android builds can be created and published to expo and then later be released to AppStore.
These builds have expo URLs for JS bundle part of them (e.g. https://exp.host/@sachin-goyal-expo/baat-org-rnative), and everytime a new JS bundle is published app will automatically load it next time it starts.

```
expo build:android -t apk
```
