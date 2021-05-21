import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { HeaderButton } from 'react-navigation-header-buttons';
import MyColors from '../constants/MyColors'

export default function CustomHeaderButton(props) {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={25}
            color={Platform.OS === 'android' ? 'white' : MyColors.primary}
        />
    )
}

const styles = StyleSheet.create({})
