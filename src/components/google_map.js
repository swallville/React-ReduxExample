/* global google */
import {
  default as React,
  Component,
  PropTypes
} from 'react';
import _ from 'lodash';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
import FaSpinner from 'react-icons/lib/fa/spinner';

/*
 * https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class GoogleMaps extends Component {
  constructor(props){
    super(props);
    this.state = {
      center: {
        lat: props.data.lat,
        lng: props.data.lon,
      },
      markers: []
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    this.setState({
      markers: nextMarkers,
    });
  }

  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    console.log(nextMarkers);
    this.setState({
      markers: nextMarkers,
    });
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  render() {
    return (
    <GoogleMapLoader
      loadingElement={
        <div style={{ height: `100%` }}>
          <FaSpinner
            style={{
              display: `block`,
              width: `80px`,
              height: `80px`,
              margin: `150px auto`,
              animation: `fa-spin 2s infinite linear`,
            }}
          />
        </div>
      }
      containerElement={
        <div style={{ height: `100%` }} />
      }
      mapElement={
        <div style={{ height: `100%` }} />
      }
      googleMapElement={
        <GoogleMap
          ref={this.handleMapLoad}
          defaultZoom={10}
          defaultCenter={this.state.center}
          onClick={this.handleMapClick}
        >
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
          >
            {this.state.markers.map((marker, index) => (
              <Marker {...marker} key={index} onClick={() =>
                this.handleMarkerRightClick(marker)}/>
            ))}
          </MarkerClusterer>
        </GoogleMap>
      }
     />
    );
  }
}
