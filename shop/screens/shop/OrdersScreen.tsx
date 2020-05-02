import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constans/Colors';
import * as orderActions from '../../store/actions/orders';


const OrderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => {
        return state.orders.orders
    })
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true)
        dispatch(orderActions.fetchOrders()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])

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

    if (orders.length === 0) {
        return (
            <View style={styles.centerd}>
                <Text>Not found</Text>
            </View>
        )
    }

    return <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
        />}
    />
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Cart'
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

export default OrderScreen;