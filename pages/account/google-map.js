import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {}
        };
        if(props.currentLocation && props.currentLocation.lat !== undefined){
            this.state.position = props.currentLocation
        }else{
            this.state.position = { lat: 43.255721, lng: -79.871102 }            
        }
        this.onMapClicked = this.onMapClicked.bind(this);
    }
    onMapClicked(props, map, e) {
        let location = this.state.position;
        location.lat = e.latLng.lat();
        location.lng = e.latLng.lng();

        this.setState({
            position: location
        })
        this.props.getPosition(this.state.position)
    }

    render() {
        return (
            <Map google={window.google} zoom={10} className={"map"} initialCenter={this.state.position} onClick={this.onMapClicked}>
                <Marker position={{ lat: this.state.position.lat, lng: this.state.position.lng }} name={'Current location'} />
            </Map>
        )
    }
  
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDZfVO29Iytspv4xz7S68doIoiztiRLhbk",
  v: "3.30"
})(MapContainer);
