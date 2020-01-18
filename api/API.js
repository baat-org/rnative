import { AsyncStorage } from "react-native";
import { GQL_API_URI } from 'react-native-dotenv';

class API {
    static fetchAllUsers = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        let users = [];

        await fetch(GQL_API_URI,
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

    static authorize = async (userToken, successCallBack, failureCallBack) => {
        fetch(GQL_API_URI,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "mutation { validateUserToken ( userToken: \\\"' + userToken + '\\\")}", "variables": null}',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.data && responseJson.data.validateUserToken) {
                    successCallBack(responseJson.data.validateUserToken);
                } else {
                    failureCallBack();
                }
            })
            .catch((error) => {
                console.log(error);
                failureCallBack();
            });
    }


    static login = async (userName, password, successCallBack, failureCallBack) => {
        fetch(GQL_API_URI,
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

    static signup = async (email, name, successCallBack, failureCallBack) => {
        fetch(GQL_API_URI,
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

}

export default API