import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from './../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux'
import PlaceItem from '../components/PlaceItem'
import * as placesActions from '../store/places-actions'

export default function PlaceListScreen(props) {
    const dispatch = useDispatch()
    const places = useSelector(state => state.places.places)
    // console.log(places)

    useEffect(() => {
        dispatch(placesActions.loadPlaces())
    }, [dispatch])

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <PlaceItem
                    image={itemData.item.imageUri}
                    title={itemData.item.title}
                    address={itemData.item.address}
                    onSelect={() => {
                        props.navigation.navigate('PlaceDetail', {
                            placeTitle: itemData.item.title,
                            placeId: itemData.item.id
                        });
                    }}
                />
            )}
        />
    );
}

PlaceListScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Places',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add Place'
                    iconName={Platform.OS === 'android' ? 'md-add-circle-outline' : 'ios-add-circle-outline'}
                    onPress={() => { navData.navigation.navigate('NewPlace') }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({})
