import { MapContainer  } from 'react-leaflet/MapContainer'
import { TileLayer  } from 'react-leaflet/TileLayer'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { Circle } from 'react-leaflet/Circle';
import { useMap } from 'react-leaflet/hooks'

function EditMap(props){
    return (
        <div>
        <MapContainer center={[18.76, 100.76]} zoom={8} zoomSnap={1} style={{height: '80vh', width:'100%'}}>
        <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        </MapContainer>
        </div>
    )
}

export default EditMap;