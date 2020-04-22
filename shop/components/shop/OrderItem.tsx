import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constans/Colors';
import Card from '../UI/Card';


const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false)
    return (
        <Card styles={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
                color={Colors.primary}
                title={showDetails ? 'Hide Detalis' : 'Show Details' }
                onPress={()=>{
                    setShowDetails(prevState => !prevState)
                }}
            />
            {showDetails && <View>
                {props.items.map(cartItem => <CartItem
                    key={cartItem.productId}
                    title={cartItem.productTitle}
                    amount={cartItem.sum}
                    quantity={cartItem.quantity}
                />)}    
            </View>}
        </Card>
    )
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    }
});

export default OrderItem;