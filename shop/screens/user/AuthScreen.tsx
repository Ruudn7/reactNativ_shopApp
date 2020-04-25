import React from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView, StyleSheet, Button, Platform } from 'react-native';

import CustomInput from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constans/Colors';

import { LinearGradient } from 'expo-linear-gradient';

const AuthScreen  = props => {
    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === 'ios' ? "padding" : undefined}
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient
                colors={['#ffedff', '#ffe3ff']}
                style={styles.gradient}
            >
                <Card styles={styles.authContainer}>
                    <ScrollView>
                        <CustomInput
                            id='email'
                            label='Email'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorMessage='Please enter a valid email address.'
                            onInputChange={() => {}}
                            initialValue=''
                        />
                        <CustomInput
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            minLength={5}
                            required
                            email
                            autoCapitalize='none'
                            errorMessage='Please enter a valid password.'
                            onInputChange={() => {}}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title='Login'
                                color={Colors.primary}
                                onPress={()=>{}}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title='Switch to Sign up'
                                color={Colors.accent}
                                onPress={()=>{}}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>

    )
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authentcate'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        margin: 10
    }
}); 

export default AuthScreen ;