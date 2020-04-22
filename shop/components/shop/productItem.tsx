import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

import Card from '../UI/Card';

const ProductItem = props => {
    let TouchableCmp: any = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
            <Card styles={styles.product}>
                <View style={styles.touchable}>
                    <TouchableCmp onPress={props.onSelect} useForegroud>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: props.image}} style={styles.image} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>

                        <View style={styles.actions}>
                            {props.children}
                        </View>
                    </TouchableCmp>
                </View>
            </Card>

    )
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
    },
    imageContainer: {
        width: '100%',
        height: '55%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '20%',
        padding: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10

    }
});

export default ProductItem;