import Constants from "expo-constants";
import { Platform } from "react-native";

const localhostGql =
 Platform.OS === "ios" ? "http://localhost:8081/graphql" : "http://10.0.2.2:8081/graphql";
const localhostWs =
 Platform.OS === "ios" ? "ws://localhost:8082/websockets" : "ws://10.0.2.2:8082/websockets";

const ENV = {
    dev: {
        gqlApiUri: localhostGql,
        websocketsUri: localhostWs,
    },
    staging: {
        gqlApiUri: 'http://staging.baat.org/graphql',
        websocketsUri: 'ws://staging.baat.org/websockets',
    },
    prod: {
        gqlApiUri: 'http://www.baat.org/graphql',
        websocketsUri: 'ws://www.baat.org/websockets',
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // What is __DEV__ ?
    // This variable is set to true when react-native is running in Dev mode.
    // __DEV__ is true when run locally, but false when published.
    if (__DEV__) {
        return ENV.dev;
    } else if (env === 'staging') {
        return ENV.staging;
    } else if (env === 'prod') {
        return ENV.prod;
    }
};

export default getEnvVars;
