import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native'
import MyColors from '../constants/MyColors'
import { useDispatch } from 'react-redux'
import { addPlace } from '../store/places-actions'
import ImgPicker from './../components/ImagePicker';
import LocationPicker from './../components/LocationPicker';

export default function NewPlaceScreen(props) {
    const dispatch = useDispatch()
    const [titleValue, setTitleValue] = useState('')
    const [selectedImage, setSelectedImage] = useState()
    const [selectedLocation, setSelectedLocation] = useState()

    const titleChangeHandler = (text) => {
        setTitleValue(text)
    }

    const imageTakenHandler = (imagePath) => {
        setSelectedImage(imagePath)
    }

    const locationPickedHandler = useCallback((location) => {
        setSelectedLocation(location)
    }, [])

    const savePlaceHandler = () => {
        dispatch(addPlace(titleValue, selectedImage, selectedLocation))
        props.navigation.goBack()
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImgPicker onImageTaken={imageTakenHandler} />
                <LocationPicker
                    navigation={props.navigation}
                    onLocationPicked={locationPickedHandler} />
                <Button
                    title='Save Place'
                    color={MyColors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = (props) => {
    return {
        headerTitle: 'Add New Place'
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})
