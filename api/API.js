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
}

export default API