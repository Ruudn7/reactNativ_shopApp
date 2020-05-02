import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import Card from '../../components/UI/Card';
import CustomInput from '../../components/UI/Input';
import Colors from '../../constans/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state
}

const AuthScreen  = props => {
    const [isLodaing, setIsLoading] = useState(false)
    const [error, setError] = useState(undefined)
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false,
    });

    useEffect(()=>{
        if (error) {
            Alert.alert('An Error Ocurred!', error, [
                {
                    text: 'OK'
                }
            ])
        }
    }, [error])

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            )
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            )    
        }
    setIsLoading(true)
        try {
            setError(undefined)
            await dispatch(action);
            // props.navigation.navigate('Shop')
        } catch (err) {
            setError(err.message)
            setIsLoading(false)
        }
        
    }

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        let isValid = false;
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])


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
                            errorText='Please enter a valid email address.'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <CustomInput
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            minLength={5}
                            required
                            autoCapitalize='none'
                            errorText='Please enter a valid password.'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            {!isLodaing
                                ? <Button
                                    title={ isSignup ? 'Sign Up' : 'Login'}
                                    color={Colors.primary}
                                    onPress={authHandler}
                                />
                                : <ActivityIndicator size='small' />
                            }
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${ isSignup ? 'Login' : 'Sign Up'}`}
                                color={Colors.accent}
                                onPress={()=>{
                                    setIsSignup( prevState => !prevState)
                                }}
                            />  
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>

    )
};

export const optionsScreen = {
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