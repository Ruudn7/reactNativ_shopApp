import React from 'react';
import { FlatList, Button, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/productItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constans/Colors';
import * as productsActions from '../../store/actions/product'

const UserProductScreen = props => {
    const userProducts = useSelector(state =>  state.products.userProducts);
    const dispatch = useDispatch()

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {}}
                onAddToCart={() => {}}
            >
                <Button
                    color={Colors.primary}
                    title='Edit'
                    onPress={() => {
                        
                    }}
                />
                <Button
                    color={Colors.primary}
                    title='Delete'
                    onPress={() => {
                        dispatch(productsActions.deleteProduct(itemData.item.id))
                    }}
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
        )
    }
}

const styles = StyleSheet.create({

});

export default UserProductScreen;