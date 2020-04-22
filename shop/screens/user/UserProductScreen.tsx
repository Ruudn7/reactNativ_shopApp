import React from 'react';
import { Alert, Button, FlatList, Platform, StyleSheet } from 'react-native';
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


UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your products',
        headerLeft: (
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
        headerRight: (
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

});

export default UserProductScreen;