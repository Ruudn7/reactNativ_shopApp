import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount}</Text>
                <TouchableOpacity onPress={props.onRemove}>
                    <Ionicons 
                        name={ Platform.OS === 'android' ? 'md-trash' : 'ios-trash' }
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;