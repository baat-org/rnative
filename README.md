# rnative
Frontends (React Native)

## Installation
Must Install Node 10 LTS & Expo

```
npm install -g expo-cli
npm install
```

Install dependencies
```
npm install
```

## Run Server Locally
Run Server and Package manager locally and point to the local QR code from device (Expo App).

```
expo start
```

For Web:
```
expo start --web
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

For web:
```
expo build:web
```

## Environment setup

Staging/Production [TODO](https://alxmrtnz.com/thoughts/2019/03/12/environment-variables-and-workflow-in-expo.html)

## Screenshots

<img width="1280" alt="Screenshot 2021-05-19 at 23 29 08" src="https://user-images.githubusercontent.com/12097639/118893298-1a72d480-b8fa-11eb-9a0c-3ffdb0317232.png">

