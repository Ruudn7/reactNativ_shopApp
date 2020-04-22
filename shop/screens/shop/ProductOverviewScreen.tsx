import React from 'react';
import { FlatList, Button, Platform, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../../components/shop/productItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constans/Colors';


const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title
        })
    }
    
    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={
                itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}
                onAddToCart={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }}
            >   
                <Button
                    color={Colors.primary}
                    title='View Details'
                    onPress={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}
                />
                <Button
                    color={Colors.primary}
                    title='To Cart'
                    onPress={() => {
                        dispatch(cartActions.addToCart(itemData.item))
                    }}
                />
            </ProductItem>
            }
        />
    );
};

ProductOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All products',
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
                    title='Cart'
                    iconName={ Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={()=>{
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({

});

export default ProductOverviewScreen;   