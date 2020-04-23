import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../../components/shop/productItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constans/Colors';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/product';

const ProductOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState('');

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title
        })
    }

    const loadProducts = useCallback(async () => {
        setError('');
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts()).then();
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false)
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(()=> {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
        return () => {
            willFocusSub.remove()
        }
    }, [loadProducts])

    if (error) {
        return (
            <View style={styles.centerd}>
                <Text>Error occured</Text>
                <Button
                    title='Try again'
                    onPress={loadProducts}
                    color={Colors.primary}
                />
            </View>
        )
    }

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

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centerd}>
                <Text>No Product finded</Text>
            </View>
        )
    }
    
    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
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
    centerd: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductOverviewScreen;   