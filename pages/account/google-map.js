import React, {useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '150px'
};

const center = {
    lat: 43.255721,
    lng: -79.871102
};

function MyComponent(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDZfVO29Iytspv4xz7S68doIoiztiRLhbk"
    })

    const [map, setMap] = useState(null)
    const [position, setposition] = useState(center);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const onMapClicked = (e) => {
        let location = {};
        location.lat = e.latLng.lat();
        location.lng = e.latLng.lng();

        setposition(location);
        props.getPosition(position)
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={onMapClicked}
        >
            <Marker 
                icon={"/assets/marker.svg"} 
                position={{ lat: position.lat, lng: position.lng }}
            />
            <></>
        </GoogleMap> 
    ) : <></>
}

export default React.memo(MyComponent)