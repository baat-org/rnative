import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    button: {
        padding: 10,
        marginBottom: 10,
    },
    error: {
        padding: 10,
        color: 'red',
        marginBottom: 10,
    },
});
