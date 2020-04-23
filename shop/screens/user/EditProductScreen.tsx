import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View, ActivityIndicator, Text, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import CustomInput from '../../components/UI/Input';
import * as productActions from '../../store/actions/product';

import Colors from '../../constans/Colors';

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

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    )
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false,
    });

    useEffect(() => {
        if (error) {
            Alert.alert(
                'An error occured',
                error,
                [{ text: 'OK'}]
            );
        }
    }, [error])

    const submitHandler = useCallback( async () => {
        if (!formState.formIsValid ) {
            Alert.alert('Wrong input!', 'Pleaase check the valid input messages', [
                {text: 'Ok'}
            ])
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            if (editedProduct) {
                await dispatch(productActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                )) 
            } else {
                await dispatch(productActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                )) 
            }
            props.navigation.goBack();
        } catch (err) {
            setError(err.message)
        }

        setIsLoading(false);
        
    }, [dispatch, prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, formState.inputValues.price]);
        
    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        let isValid = false;
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])


    if (isLoading) {
        return (
            <View style={styles.centerd}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primary}
                />
            </View>
        )
    }

    return (
        // <KeyboardAvoidingView
        //     style={{ flex: 1 }}
        //     behavior="padding"
        //     keyboardVerticalOffset={1}
        // >
            <ScrollView>
                <View style={styles.form}>
                    <CustomInput
                        id='title'
                        label='Title'
                        errorText='Please enter a valid title'
                        keyboardType='default'
                        autoCaptitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initialValid={!!editedProduct}
                        required
                    />
                    <CustomInput
                        id='imageUrl'
                        label='Image url'
                        errorText='Please enter a valid Image url'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initialValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (
                        <CustomInput
                            id='price'
                            label='Price'
                            errorText='Please enter a valid Price'
                            keyboardType='decimal-pad'
                            returnKeyType='next'
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    )}
                    <CustomInput
                        id='description'
                        label='Descritpion'
                        errorText='Please enter a valid description'
                        keyboardType='default'
                        autoCaptitalize='sentences'
                        autoCorrect
                        multiLine
                        numberOfLines={3}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initialValid={!!editedProduct}
                        onInputChange={inputChangeHandler}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        // </KeyboardAvoidingView>
    )
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Save'
                    iconName={ Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centerd: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductScreen;