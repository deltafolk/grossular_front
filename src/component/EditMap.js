import { MapContainer  } from 'react-leaflet/MapContainer'
import { TileLayer  } from 'react-leaflet/TileLayer'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { Circle } from 'react-leaflet/Circle';
import { useMap } from 'react-leaflet/hooks'

import { FeatureGroup } from "react-leaflet/FeatureGroup"
import { EditControl } from "react-leaflet-draw"
import { LayersControl } from "react-leaflet/LayersControl"

import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

function EditMap(props){

    const addData = ()=>{
        props.onAddJSON(
            {
                type: "FeatureCollection",
                features: arrJSON
            }
        )
    }

    const [arrJSON, setarrJSON] = useState([])

    let maindb = props.maindb.main_db
    //console.log(maindb)

    const _onEdited = e => {
        let numEdited = 0;
        let layer = e.layers;

        e.layers.eachLayer(layer => {
          numEdited += 1;
        });
        //console.log(`_onEdited: edited ${numEdited} layers`, e);
        setarrJSON(arrJSON.push(layer.toGeoJSON()))
        console.log(arrJSON)
    
        // this._onChange();
      };
    
      const _onCreated = e => {
        //alert("test");
        
    
        let type = e.layerType;
        let layer = e.layer;
        if (type === "marker") {
          // Do marker specific actions
          console.log("_onCreated: marker created", e);
        } else {
          console.log("_onCreated: something else created:", type, e);
        }
    
        //console.log("Geojson", layer.toGeoJSON());
        arrJSON.push(layer.toGeoJSON())

        addData() // ส่งข้อมูลกลับไปที่ edit

        console.log(arrJSON)
        //console.log("coords", layer.getLatLngs());
        // Do whatever else you need to. (save to db; etc)
    
        // this._onChange();
      };
    
      const _onDeleted = e => {
        let numDeleted = 0;
        let layer = e.layers;
        e.layers.eachLayer(layer => {
          numDeleted += 1;
        });
        console.log(`onDeleted: removed ${numDeleted} layers`, e);
        arrJSON.push(layer.toGeoJSON())
        console.log(arrJSON)
        // this._onChange();
      };
    
      const _onMounted = drawControl => {
        console.log("_onMounted", drawControl);
      };
    
      const _onEditStart = e => {
        console.log("_onEditStart", e);
      };
    
      const _onEditStop = e => {
        console.log("_onEditStop", e);
      };
    
      const _onDeleteStart = e => {
        console.log("_onDeleteStart", e);
      };
    
      const _onDeleteStop = e => {
        console.log("_onDeleteStop", e);
      };
    
      const _onDrawStart = e => {
        console.log("_onDrawStart", e);
      };


      function MapComponent(props) {

        let post = JSON.parse(props.data.main_data);
            console.log(props.data.keyname)
            if (props.data.type != 'point') {
            return (
                <GeoJSON 
                    key={uuidv4()}
                    data={[post]}
                    style={setColor(props.data.color)}
                />
            ) } else {
                return (
                    <GeoJSON 
                    key={uuidv4()}
                    data={[post]}
                    />

                    //<Circle
                    //key={uuidv4()}
                    //center={[18.76, 100.76]}
                    //pathOptions={setCircleColor(props.data.color)}
                    //radius= '15.0'
                    //>
                ) 
            }
    }

    function setColor(input){
        return {color: input, weight: '2.0', opacity: 1,fillOpacity: 0.5,interactive: true, fillColor: input};
    }

    return (
        <div>
            
        <MapContainer center={[18.76, 100.76]} zoom={8} zoomSnap={1} style={{height: '80vh', width:'100%'}}>
        <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
            <FeatureGroup>
                <EditControl
                    position='topleft'
                    onEdited={_onEdited}
                    onCreated={_onCreated}
                    onDeleted={_onDeleted}
                    draw={{
                        rectangle: false,
                        circle: false,
                        circlemarker: false
                    }}
                />
                <Circle center={[51.51, -0.06]} radius={200} />
            </FeatureGroup>

        <LayersControl position="topright">

                {maindb.map((list)=>{

                    return ( 
                        <div>
                        <LayersControl.Overlay name={(list.name)}>
                        <FeatureGroup>
                            <MapComponent data={(list)} key={uuidv4()}/>
                        </FeatureGroup>
                        </LayersControl.Overlay>
                        </div>
                    )
                
                })}

        </LayersControl>

        </MapContainer>
        </div>
    )
}

export default EditMap;