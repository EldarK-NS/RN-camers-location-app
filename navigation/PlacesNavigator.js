import { React } from 'react';
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import PlaceListScreen from './../screens/PlaceListScreen';
import PlaceDetailScreen from './../screens/PlaceDetailScreen';
import MapScreen from './../screens/MapScreen';
import NewPlaceScreen from './../screens/NewPlaceScreen';
import MyColors from '../constants/MyColors'


const PlacesNavigator = createStackNavigator({
    Places: PlaceListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? MyColors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : MyColors.primary
    }
})

export default createAppContainer(PlacesNavigator)