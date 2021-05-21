import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator, Alert } from 'react-native'
import MyColors from '../constants/MyColors'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';

export default function LocationPicker(props) {
    const [pickedLocation, setPickedLocation] = useState()
    const [isFetching, setIsFetching] = useState(false)

    const mapPickedLocation = props.navigation.getParam('pickedLocation')

    const{onLocationPicked}=props

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation)
            onLocationPicked({mapPickedLocation})
        }
    }, [mapPickedLocation, onLocationPicked])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND, Permissions.LOCATION_BACKGROUND)
        if (result.status !== 'granted') {
            Alert.alert('Insufficient permissions',
                'You need to grant location permissions to use this app',
                [{ text: 'Okay' }])
            return false;
        }
        return true
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return
        }
        try {
            setIsFetching(true)
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 })
            // console.log(location)
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })

            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        } catch (err) {
            Alert.alert('Could not fetch location',
                'Please try again later or ick a location on the map',
                [{ text: 'Okay' }]
            )
        }
        setIsFetching(false)
    }
    
    const pickOnMapHandler = () => {
        props.navigation.navigate('Map')
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
                {isFetching ? (
                    <ActivityIndicator size="large" color={MyColors.primary} />
                ) : (
                    <Text>No location chosen yet</Text>
                )}
            </MapPreview>
            <View style={styles.actions}>

                <Button
                    title='Get user location'
                    color={MyColors.primary}
                    onPress={getLocationHandler}
                />
                <Button
                    title='Pick on map'
                    color={MyColors.primary}
                    onPress={pickOnMapHandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
})
