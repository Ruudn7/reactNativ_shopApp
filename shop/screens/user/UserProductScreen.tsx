import React from 'react';
import { Alert, Button, FlatList, Platform, StyleSheet, View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../../components/shop/productItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constans/Colors';
import * as productsActions from '../../store/actions/product';

const UserProductScreen = props => {
    const userProducts = useSelector(state =>  state.products.userProducts);
    const dispatch = useDispatch();
    const edtiProductHanldler = (id) => {
        props.navigation.navigate('EditProduct', {productId: id});
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this product?',[
            {text: 'No', style: 'default'},
            {text: 'Yes', style:'destructive', onPress: () => {
                dispatch(productsActions.deleteProduct(id))
            }}
        ])
    }

    if (userProducts.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Not found</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    edtiProductHanldler(itemData.item.id)
                }}
            >
                <Button
                    color={Colors.primary}
                    title='Edit'
                    onPress={() => {
                        edtiProductHanldler(itemData.item.id)
                    }}
                />
                <Button
                    color={Colors.primary}
                    title='Delete'
                    onPress={() => deleteHandler(itemData.item.id)}
                />
            </ProductItem>
        
        }
        />
    )
};


export const optionsSceen = navData => {
    return {
        headerTitle: 'Your products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={()=>{
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add'
                    iconName={ Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={()=>{
                        navData.navigation.navigate('EditProduct')
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserProductScreen;