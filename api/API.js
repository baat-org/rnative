import { AsyncStorage } from "react-native";
import getEnvVars from '../environment';
const { gqlApiUri } = getEnvVars();

class API {
    static getCurrentUser = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        let user;

        await fetch(gqlApiUri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "{ userForToken ( userToken: \\\"' + userToken + '\\\") { id, email, fullName, avatarUrl } }", "variables": null, "operationName":null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.userForToken) {
                    user = responseJson.data.userForToken;
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return user;
    }

    static authorize = async (userToken) => {
        let authorized = false;
        await fetch(gqlApiUri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "mutation { authorize ( userToken: \\\"' + userToken + '\\\")}", "variables": null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.authorize) {
                    authorized = true;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        return authorized;
    }


    static login = async (userName, password, successCallBack, failureCallBack) => {
        await fetch(gqlApiUri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "mutation { authenticate ( userName: \\\"' + userName + '\\\", password: \\\"' + password + '\\\")}", "variables": null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.authenticate) {
                    successCallBack(responseJson.data.authenticate);
                } else if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
                    failureCallBack(responseJson.errors[0].message);
                }
            })
            .catch((error) => {
                failureCallBack(error);
            });
    }

    static signup = async (email, name, password, successCallBack, failureCallBack) => {
        await fetch(gqlApiUri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "mutation { signup ( email: \\\"' + email + '\\\", name: \\\"' + name + '\\\", password: \\\"' + password + '\\\", avatarUrl: \\\"\\\")}", "variables": null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.signup) {
                    successCallBack(responseJson.data.signup);
                } else if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
                    failureCallBack(responseJson.errors[0].message);
                }
            })
            .catch((error) => {
                failureCallBack(error);
            });
    }


    static chat = async (recipientChannelId, recipientUserId, textMessage, successCallBack, failureCallBack) => {
        const userToken = await AsyncStorage.getItem('userToken');

        await fetch(gqlApiUri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "mutation { chat ( senderUserToken: \\\"' + userToken + '\\\", recipientUserId: ' + recipientUserId + ', recipientChannelId: ' + recipientChannelId + ', textMessage: \\\"' + textMessage + '\\\")}", "variables": null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.chat) {
                    successCallBack(responseJson.data.chat);
                } else if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
                    failureCallBack(responseJson.errors[0].message);
                }
            })
            .catch((error) => {
                failureCallBack(error);
            });
    }

    static fetchAllChannels = async () => { 
        const userToken = await AsyncStorage.getItem('userToken');
        let channels = [];

        await fetch(gqlApiUri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "{ channels ( userToken: \\\"' + userToken + '\\\") { id, name, description, archived } }", "variables": null, "operationName":null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.channels) {
                    channels = responseJson.data.channels;
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return channels;
    }

    static getChannelsForCurrentUser = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        let channels = [];

        await fetch(gqlApiUri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "{ channelsForUser ( userToken: \\\"' + userToken + '\\\") { id, name, description, archived } }", "variables": null, "operationName":null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.channelsForUser) {
                    channels = responseJson.data.channelsForUser;
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return channels;
    }

    static fetchAllUsers = async () => { 
        const userToken = await AsyncStorage.getItem('userToken');
        let users = [];

        await fetch(gqlApiUri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "{ users ( userToken: \\\"' + userToken + '\\\") { id, email, fullName, avatarUrl } }", "variables": null, "operationName":null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.users) {
                    users = responseJson.data.users;
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return users;
    }

    static getDirectsForCurrentUser = async () => { 
        const userToken = await AsyncStorage.getItem('userToken');
        let users = [];

        await fetch(gqlApiUri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "{ directsForUser ( userToken: \\\"' + userToken + '\\\") { id, email, fullName, avatarUrl } }", "variables": null, "operationName":null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.directsForUser) {
                    users = responseJson.data.directsForUser;
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return users;
    }

    static createDirect = async (userId) => { 
        const userToken = await AsyncStorage.getItem('userToken');
        let success = false;

        await fetch(gqlApiUri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "mutation { createDirect ( userToken: \\\"' + userToken + '\\\", secondUserId: ' + userId + ') }", "variables": null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.createDirect) {
                    success = true;
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return success;
    }

    static removeDirect = async (userId) => { 
        const userToken = await AsyncStorage.getItem('userToken');
        let success = false;

        await fetch(gqlApiUri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "mutation { removeDirect ( userToken: \\\"' + userToken + '\\\", secondUserId: ' + userId + ') }", "variables": null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.removeDirect) {
                    success = true;
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return success;
    }

}

export default API