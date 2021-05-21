import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator'
import * as Font from 'expo-font'
import { enableScreens } from 'react-native-screens'
import AppLoading from 'expo-app-loading'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import placesReducer from './store/places-reducer';
import { init } from './helpers/db'

enableScreens()

init()
.then(() => {
  console.log('Initialized database')
}).catch(err => {
  console.log('Initializing db failed')
  console.log(err)
})

const fetchFonts = async () => {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}
const rootReducer = combineReducers({
  places: placesReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => { setFontLoaded(true) }}
        onError={(err) => console.log(err)}
      />
    )
  }
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}


