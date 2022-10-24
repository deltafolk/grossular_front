import Button from 'react-bootstrap/Button';
import { useState, useEffect } from '../../node_modules/react/index';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { MapContainer  } from 'react-leaflet/MapContainer'
import { TileLayer  } from 'react-leaflet/TileLayer'
import { GeoJSON } from 'react-leaflet/GeoJSON'

let itemURL = 'http://localhost:7000/item';

function Item(props){

    const token = localStorage.getItem('token');
    const offkey = localStorage.getItem('offkey');
    const offname = localStorage.getItem('offname');

    let [post, setPost] = useState([{}]);
    const [isLoading, setLoading] = useState(true);

    let testx ={
        "type": "FeatureCollection",
        "name": "testpoly",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
        { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 100.737115, 18.724892 ], [ 100.739105, 18.722143 ], [ 100.740841, 18.725832 ], [ 100.744096, 18.722721 ], [ 100.742867, 18.71867 ], [ 100.738454, 18.719285 ], [ 100.73632, 18.722107 ], [ 100.737115, 18.724892 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 100.73755, 18.718236 ], [ 100.74265, 18.718092 ], [ 100.74482, 18.718453 ], [ 100.745073, 18.715162 ], [ 100.742505, 18.713173 ], [ 100.738273, 18.713173 ], [ 100.737622, 18.716826 ], [ 100.73755, 18.718236 ] ] ] ] } }
        ]
        };

    let testy = {
        "type": "FeatureCollection",
        "name": "testpoly",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
        { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 100.837021517967216, 18.760826071406573 ], [ 100.839011517967208, 18.758077071406571 ], [ 100.840747517967216, 18.761766071406573 ], [ 100.844002517967212, 18.758655071406572 ], [ 100.842773517967217, 18.754604071406572 ], [ 100.838360517967217, 18.755219071406572 ], [ 100.836226517967219, 18.758041071406574 ], [ 100.837021517967216, 18.760826071406573 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 100.837456517967212, 18.754170071406573 ], [ 100.842556517967211, 18.754026071406571 ], [ 100.844726517967217, 18.754387071406573 ], [ 100.844979517967218, 18.751096071406572 ], [ 100.842411517967207, 18.749107071406574 ], [ 100.83817951796722, 18.749107071406574 ], [ 100.837528517967215, 18.752760071406573 ], [ 100.837456517967212, 18.754170071406573 ] ] ] ] } }
        ]
        };

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


    let colorArr = [];
    function ranColor(){
        let rann = Math.floor(Math.random()*16777215).toString(16);
        colorArr.push('#'+rann);
        return '#' + rann
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

    function removeBackSlash(input){
        return input.replace(/\\/g, "");
    }

    function MenuX() {
        return (
          <DropdownButton className='p-0 m-0'
            align="end"
            title="ตัวเลือก"
            size="sm"
            id="dropdown-menu-align-end"
          >
            <Dropdown.Item eventKey="1">สร้างแผนที่ (A4)</Dropdown.Item>
            <Dropdown.Item eventKey="2">แก้ไข</Dropdown.Item>
            <Dropdown.Item eventKey="3">ลบ</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">ข้อมูลค่าพิกัด</Dropdown.Item>
            <Dropdown.Item eventKey="5">ข้อมูลเชิงพื้นที่</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="6">ดาวน์โหลด Shape File (.zip)</Dropdown.Item>
            <Dropdown.Item eventKey="7">ดาวน์โหลด KML</Dropdown.Item>
          </DropdownButton>
        );
    }                            


    //post = [{off:'น้ำงาว',offkey:'12345'},{off:'น้ำเลียบ',offkey:'8888'},{off:'น้ำขว้าง',offkey:'0000'}];

    //let {data,keyx} = props;

    if (isLoading) {
        return <div className="m-5 text-center h5">กรุณารอสักครุ่...</div>;
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

                            {post.map((listx)=>{
                                //console.log((listx.jsondata))
                                return (
                                    <GeoJSON 
                                        key={uuidv4()}
                                        data={[JSON.parse(listx.jsondata)]}
                                        style={{color:'red',weight: '15.0'}}
                                    />
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
                                            <tr key = {uuidv4()}>
                                            <td> <i className="fa fa-circle" style={{color:ranColor()}} /></td>
                                            <td> {list.offname} </td>
                                            <td> {checkType(list.type)} {list.actname} {list.amount} {checkTypeUnit(list.type)}</td>
                                            <td> {list.date} </td>
                                            <td> {list.note} </td>
                                            <td className='text-center'> {MenuX()} </td>
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