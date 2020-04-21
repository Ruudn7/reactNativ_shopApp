import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import  { Ionicons } from '@expo/vector-icons';

import Color from '../../constans/Colors';
import { Platform } from 'react-native';

const CustomHeaderButton = props => {
    return (
        <HeaderButton
            {...props} 
            IconComponent={Ionicons}
            iconSize={23}
            color={Platform.OS === 'android' ? 'whire' : Color.primary}
        />
    )
}

export default CustomHeaderButton;