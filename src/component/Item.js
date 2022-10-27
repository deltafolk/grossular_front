import Button from 'react-bootstrap/Button';
import { useState, useEffect } from '../../node_modules/react/index';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { MapContainer  } from 'react-leaflet/MapContainer'
import { TileLayer  } from 'react-leaflet/TileLayer'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { Circle } from 'react-leaflet/Circle';
import { useMap } from 'react-leaflet/hooks'
//import { L } from 'leaflet'
import bbox from 'geojson-bbox';
import Swal from 'sweetalert2'

let itemURL = 'http://localhost:7000/item';
let deleteURL = 'http://localhost:7000/delete';

function Item(props){

    const token = localStorage.getItem('token');
    const offkey = localStorage.getItem('offkey');
    const offname = localStorage.getItem('offname');

    let [post, setPost] = useState([{}]);
    const [isLoading, setLoading] = useState(true);


    useEffect(()=>{
        axios.post(itemURL, {
            token,
            offkey
          }
          ).then((res) => {
            setPost(res.data.data)
            setLoading(false);
            //console.log(res.data);
        })
    }, []);


    function deleteItem(idkey){
        axios.delete(deleteURL, {
            headers: {
                Authorization: token
              },
              data: {
                token,
                idkey
              }
          }
          ).then((res) => {
            //setPost(res.data)
            //setLoading(false);
            console.log(res.data);
            if (res.data.title == 'deleted'){
                Swal.fire({
                    icon: 'success',
                    title: 'ลบข้อมูลแล้ว',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(()=>{
                    window.location.href = '/item'
                  })
            } else {
                Swal.fire({
                    title: 'ลบข้อมูลล้มเหลว',
                    text: 'มีบางอย่างผิดพลาด กรุณาแจ้งศูนย์ภูมิสารสนเทศฯ',
                    icon: 'error',
                    confirmButtonText: 'ตกลง'
                  }).then(()=>{
                    window.location.href = '/item'
                  })
            }
        })
    }

    function confirmDelete(idkey){
        Swal.fire({
            title: 'ลบข้อมูลนี้',
            text: "ข้อมูลจะถูกลบ ต้องการดำเนินการต่อหรือไม่",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#CC0000',
            cancelButtonColor: '#555555',
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'ลบ'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                deleteItem(idkey)
              )
            }
          })
    }


    function checkType(input){
        if (input == 'point'){
            return <img src='images/point.png' height='20px' width='20px' />
        } else if (input == 'line') {
            return <img src='images/line.png' height='20px' width='20px' />
        } else {
            return <img src='images/polygon.png' height='20px' width='20px' />
        }
    }

    function checkTypeUnit(input){
        if (input == 'point'){
            return "จุด"
        } else if (input == 'line') {
            return "กม."
        } else {
            return "ไร่"
        }
    }

    function geoJSON2Circle (json){
        let jsonx = JSON.parse(json.jsondata);
        console.log(jsonx.features[0].geometry.coordinates[1])
        return (

                <Circle
                key={uuidv4()}
                center={[jsonx.features[0].geometry.coordinates[1], jsonx.features[0].geometry.coordinates[0]]}
                pathOptions={setColor(json.color)}
                radius= '10.0'
                />
        )
    }

    function MenuX(idkey) {
        return (
          <DropdownButton className='p-0 m-0'
            align="end"
            title="ตัวเลือก"
            size="sm"
            id="dropdown-menu-align-end"
          >
            <Dropdown.Item eventKey="1">สร้างแผนที่ (A4)</Dropdown.Item>
            <Dropdown.Item eventKey="2">แก้ไข</Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={()=>{confirmDelete(idkey)}}>ลบ</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">ข้อมูลค่าพิกัด</Dropdown.Item>
            <Dropdown.Item eventKey="5">ข้อมูลเชิงพื้นที่</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="6">ดาวน์โหลด Shape File (.zip)</Dropdown.Item>
            <Dropdown.Item eventKey="7">ดาวน์โหลด KML</Dropdown.Item>
          </DropdownButton>
        );
    }    
    
    function setColor(input){
        return {color: input, weight: '15.0', opacity: 1,fillOpacity: 0.5,interactive: true, fillColor: input};
    }

    function Test(input){
        const map = useMap()
        var featurex = JSON.parse(input.data.jsondata);
        let xx = (bbox(featurex))
        let yy = ([[xx[1], xx[0]] , [xx[3], xx[2]]])
        map.fitBounds([yy]);
    }

    function MapComponent(props) {

        //const [bounds, setBounds] = useState(props.data.jsondata)



/*         function SetBoundsRectangles() {
            const [bounds, setBounds] = useState(outerBounds)
            const map = useMap()
          
            const outerHandlers = useMemo(
              () => ({
                click() {
                  setBounds(outerBounds)
                  map.fitBounds(outerBounds)
                },
              }),
              [map],
            )
          
            return (
              <>
                <Rectangle
                  bounds={outerBounds}
                  eventHandlers={outerHandlers}
                  pathOptions={bounds === outerBounds ?}
                />
              </>
            )
        } */
          


        let post = JSON.parse(props.data.jsondata);
            if (props.data.type != 'point') {
            return (
                <GeoJSON 
                    key={uuidv4()}
                    data={[post]}
                    style={setColor(props.data.color)}
                />
            ) } else {
                return (
                    <Circle
                    key={uuidv4()}
                    center={[post.features[0].geometry.coordinates[1], post.features[0].geometry.coordinates[0]]}
                    pathOptions={setColor(props.data.color)}
                    radius= '10.0'
                    />
                ) 
            }
    }


    if (isLoading) {
        return (
        <div className='pt-5'>
        <center><div className="loader"></div></center>
        <div style={{backgroundColor: "#EEEEEE", height: '100vh'}} className="m-3 text-center h5">กรุณารอสักครุ่...</div>
        </div>
        )
      } 
    
    else {

        if(!token) {
            window.location.href = "/";
        }
        else {
        return (
                <div>
                    <div className="container d-flex justify-content-center mt-4" style={{display:'none'}}>
                        <div className="bg-light p-1 rounded-3 shadow border" style={{height: 'auto', width: '100%'}}>
                        <div className="text-end p-2"><img src='images/user.png' height='25px' width='25px'/> {offname} </div>
                        <div className='text-center h5 p-1'><img src='images/item.svg' height='40px' width='40px'/>รายการข้อมูล</div>

                        <div className='p-1 '>
                            <MapContainer className='rounded-3' center={[18.76, 100.76]} zoom={8} zoomSnap={1} style={{height: '450px', width:'100%'}}>
                            <TileLayer
                                attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {post.map((list)=>{
                                //console.log(list.jsondata);
                                return (
                                    <MapComponent data={(list)} key={uuidv4()}/>
                                )
                            })}

                            </MapContainer>
                        </div>

                        <div className="overflow_ py-3 ms-3" style={{height:'500px', overflowY: 'scroll'}}>
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                <th></th>
                                <th className='text-center'>หน่วยงาน</th>
                                <th className='text-center'>กิจกรรม</th>
                                <th className='text-center'>แก้ไขล่าสุด</th>
                                <th className='text-center'>หมายเหตุ</th>
                                <th></th>
                                </tr>
                                    {post.map((list)=>{
                                        //console.log((post))
                                        return (
                                            <tr key = {uuidv4()} onClick={console.log('555')}>
                                            <td> <i className="fa fa-circle" style={setColor(list.color)} /></td>
                                            <td> {list.offname} </td>
                                            <td> {checkType(list.type)} {list.actname} {list.amount} {checkTypeUnit(list.type)}</td>
                                            <td> {list.date} </td>
                                            <td> {list.note} </td>
                                            <td className='text-center'> {MenuX(list.idkey)} </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>

                        </div>
                        </div>
                    </div>
                </div>
        );
        }
    }

}

export default Item;