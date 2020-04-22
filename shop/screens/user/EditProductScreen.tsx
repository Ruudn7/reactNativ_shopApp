import React, { useCallback, useEffect, useState, useReducer } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/product';
import CustomInput from '../../components/UI/Input';


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


    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    // const [titleIsValid, setTitleIsValid] = useState(false)
    // const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    // const [price, setPrice] = useState('');
    // const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');


    const submitHandler = useCallback(() => {
        if (!formState.formIsValid ) {
            Alert.alert('Wrong input!', 'Pleaase check the valid input messages', [
                {text: 'Ok'}
            ])
            return;
        }
        if (editedProduct) {
            dispatch(productActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl
            )) 
        } else {
            dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
            )) 
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, formState.inputValues.price]);
        
    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler])

    const inputChangeHandler =  useCallback((inputIdentifier, inputValue, inputValidity) => {
        let isValid = false;
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    return (
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
                    id='descritpion'
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
        margin: 20,
    },
});

export default EditProductScreen;