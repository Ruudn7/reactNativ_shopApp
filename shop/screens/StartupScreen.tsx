import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';

import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                dispatch(authActions.setDidTryAL())
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date || !token || !userId) {
                dispatch(authActions.setDidTryAL())
                return;
            }

            const expirtationTime = expirationDate.getTime() - new Date().getTime();

            dispatch(authActions.authenticate(userId, token, expirtationTime))
        }

        tryLogin();
    }, [dispatch])
    
    return (
        <View style={styles.screen}>
            <ActivityIndicator />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;