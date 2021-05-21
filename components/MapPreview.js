import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import ENV from '../env'

export default function MapPreview(props) {
    let imagePreviewUrl
    
    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`
    }


    return (
        <TouchableOpacity style={{ ...styles.mapPreview, ...props.style }} onPress={props.onPress} >
            {props.location ? (<Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />) : (props.children)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
})



//AIzaSyB6LbRsQwVwqlV-yIXVGn8dA27-D3URLZ0

//https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=