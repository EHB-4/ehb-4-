import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const GOOGLE_MAPS_API_KEY = 'AIzaSyCMo3JwZKrURegXdHmhIApgkihjFjpAmfI'

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 0,
  lng: 0
}

export const MapComponent = () => {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export const geocodeAddress = async (address: string) => {
  const geocoder = new google.maps.Geocoder()
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        resolve(results[0].geometry.location)
      } else {
        reject(new Error('Geocoding failed'))
      }
    })
  })
} 