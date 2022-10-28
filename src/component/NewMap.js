import { useState, useEffect } from '../../node_modules/react/index';
import axios from 'axios';
import { useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

import { MapContainer  } from 'react-leaflet/MapContainer'
import { TileLayer  } from 'react-leaflet/TileLayer'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { Circle } from 'react-leaflet/Circle';
import { useMap } from 'react-leaflet/hooks'

function NewMap(props){
    let { id } = useParams();
    let newmapURL = 'http://localhost:7000/newmap';

    let [post, setPost] = useState([{}]);
    const [isLoading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const offkey = localStorage.getItem('offkey');
    const offname = localStorage.getItem('offname');

    useEffect(()=>{
        axios.post(newmapURL, {
            token,
            id
          }
          ).then((res) => {
            if (res.data.data.length == 0){
                window.location.href = '/item'
                return
            }
            setPost(res.data)
            setLoading(false);
            console.log(res.data);
        })
    }, []);




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
                        <div className="text-end p-2"><img src='../images/user.png' height='25px' width='25px'/> {offname} </div>
                        <div className='text-center h5 p-1'><img src='../images/map.svg' height='40px' width='40px'/>สร้างแผนที่</div>

                        <div className='p-2'>
                        <div className="px-0 py-1"><b>ส่วนหัวของแผนที่ (ไม่เกิน 4 บรรทัด) <span style={{color: 'red'}}> - </span></b></div>
                        <textarea className="my-2 form-control" rows="3" cols="15" name='title' maxLength='250'>
                        {"แผนที่แสดง" + post.data[0].actname + " จำนวน " + post.data[0].amount + " ไร่ ประจำปีงบประมาณ พ.ศ." + post.data[0].year}
                        </textarea>

                        <div className="px-0 py-1"><b>เลือกภาพถ่ายฐาน (Base map)</b></div>
                                <select value={null} onChange={e => null} className='form-select' defaultValue={''}>
                                <option value="" disabled hidden>--- กรุณาเลือก ---</option>
                                    {post.main_data.map((list)=>{

                                    return (
                                        <option key={uuidv4()} value={list.keyname}>{list.name}</option>
                                    )
                                    })}
                                </select>
                        </div>
                        
                        </div>
                    </div>


                    <div className="container d-flex justify-content-center mt-4 mb-5" style={{display:'none'}}>
                        <div className="bg-light p-1 rounded-3 shadow border" style={{height: '100%', width: '100%'}}>
                            <div id='maptopox' className="overflow px-4 pb-4">
{/*                                 <div id='topographicmap' style={{width: '31.5cm', height: '44.55cm', backgroundColor: "black"}}>
                                    <div className='text-center p-5' style={{fontSize:'20px',backgroundColor: "cyan", height: '5.5cm', width: '100%'}}>แผนที่แสดงปลูกเสริมป่าเพื่อปรับปรุงระบบนิเวศต้นน้ำ จำนวน 300 ไร่ ประจำปีงบประมาณ พ.ศ.2566</div>
                                    <div style={{backgroundColor: "yellow", height: '1.5cm', width: '100%'}}>
                                        <div style={{backgroundColor: "tomato", height: '100%', width: '1.49cm', display:'inline-block'}}>
                                            0
                                        </div>
                                        <div style={{backgroundColor: "red", height: '100%', width: '5.7cm', display:'inline-block'}}>
                                            1
                                        </div>
                                        <div style={{backgroundColor: "blue", height: '100%', width: '5.7cm', display:'inline-block'}}>
                                            2
                                        </div>
                                        <div style={{backgroundColor: "red", height: '100%', width: '5.7cm', display:'inline-block'}}>
                                            3
                                        </div>
                                        <div style={{backgroundColor: "blue", height: '100%', width: '5.7cm', display:'inline-block'}}>
                                            4
                                        </div>
                                        <div style={{backgroundColor: "red", height: '100%', width: '5.7cm', display:'inline-block'}}>
                                            5
                                        </div>
                                        <div style={{backgroundColor: "tomato", height: '100%', width: '1.49cm', display:'inline-block'}}>
                                            0
                                        </div>
                                    </div>


                                        <div style={{backgroundColor: "blue", height: '27.5cm', width: '1.49cm', display:'inline-grid'}}>
                                            <div className="text-center" style={{backgroundColor: "tomato", height: '5.52cm', width: '1.49cm', display:''}}>
                                                6
                                            </div>
                                            <div style={{backgroundColor: "tomato", height: '5.52cm', width: '1.49cm', display:''}}>
                                                7
                                            </div>
                                            <div style={{backgroundColor: "tomato", height:'5.52cm', width: '1.49cm', display:''}}>
                                                8
                                            </div>
                                            <div style={{backgroundColor: "tomato", height:'5.52cm', width: '1.49cm', display:''}}>
                                                9
                                            </div>
                                            <div style={{backgroundColor: "tomato", height: '5.52cm', width: '1.49cm', display:''}}>
                                                10
                                            </div>
                                        </div>

                                        <div style={{backgroundColor: "cyan", height: '27.5cm', width: '28.5cm', display:'inline-grid'}}>
                                            <div style={{backgroundColor: "tomato", height: '0px', width: '100%', display:''}}>
                                                <MapContainer center={[18.76, 100.76]} zoom={8} zoomSnap={1} zoomControl={false} style={{height: '27.5cm', width:'100%'}}>
                                                <TileLayer
                                                    attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                </MapContainer>
                                            </div>
                                        </div>


                                        <div style={{backgroundColor: "blue", height: '27.5cm', width: '1.49cm', display:'inline-grid'}}>
                                            <div style={{backgroundColor: "tomato", height: '5.52cm', width: '1.49cm', display:''}}>
                                                6
                                            </div>
                                            <div style={{backgroundColor: "tomato", height: '5.52cm', width: '1.49cm', display:''}}>
                                                7
                                            </div>
                                            <div style={{backgroundColor: "tomato", height: '5.52cm', width: '1.49cm', display:''}}>
                                                8
                                            </div>
                                            <div style={{backgroundColor: "tomato", height: '5.52cm', width: '1.49cm', display:''}}>
                                                9
                                            </div>
                                            <div style={{backgroundColor: "tomato", height: '5.52cm', width: '1.49cm', display:''}}>
                                                10
                                            </div>
                                        </div>


                                    <div style={{backgroundColor: "yellow", height: '1.5cm', width: '100%'}}>
                                        <div style={{backgroundColor: "tomato", height: '100%', width: '1.49cm', display:'inline-block'}}>
                                            0
                                        </div>
                                        <div style={{backgroundColor: "red", height: '100%', width: '5.7cm', display:'inline-block'}}>
                                            1
                                        </div>
                                        <div style={{backgroundColor: "blue", height: '100%', width: '5.7cm', display:'inline-block'}}>
                                            2
                                        </div>
                                        <div style={{backgroundColor: "red", height: '100%', width: '5.7cm', display:'inline-block'}}>
                                            3
                                        </div>
                                        <div style={{backgroundColor: "blue", height: '100%', width: '5.7cm', display:'inline-block'}}>
                                            4
                                        </div>
                                        <div style={{backgroundColor: "red", height: '100%', width: '5.7cm', display:'inline-block'}}>
                                            5
                                        </div>
                                        <div style={{backgroundColor: "tomato", height: '100%', width: '1.49cm', display:'inline-block'}}>
                                            0
                                        </div>
                                    </div>

                                    <div style={{backgroundColor: "green", height: '8.1cm', width: '100%'}}>55555</div>
                                </div> */}


                                <table className=''>
                                        <tr className='' colSpan='5' style={{height: '4.5cm'}}>
                                        
                                        <td style={{width: '31.35cm'}}><div className='mt-5 mb-1 mx-5 text-center title' style={{fontSize: '20px', lineHeight: '150%'}}>ทททททททททททท</div></td>
                                        </tr>
                                        <table>
                                        <tr className='text-center' style={{height: '1.05cm'}}>
                                        <td style={{width: '1.05cm'}}></td>
                                        <td style={{width: '1.05cm'}}></td>
                                        <td style={{width: '1.5cm'}}></td>
                                        <td style={{width: '6cm'}}><small>55555</small></td>
                                        <td style={{width: '6cm'}}><small>66666</small></td>
                                        <td style={{width: '6cm'}}><small>77777</small></td>
                                        <td style={{width: '6cm'}}><small>88888</small></td>
                                        <td style={{width: '1.5cm'}}></td>
                                        <td style={{width: '1.05cm'}}></td>
                                        <td style={{width: '1.05cm'}}></td>
                                        </tr>
                                        
                                        <td style={{width: '1.05cm'}}></td>
                                        <td style={{width: '1.05cm'}} className='centercenter'>
                                            <div className="text_r px-3" style={{height:'6cm'}}><small>00000</small></div>
                                            <div className="text_r px-3" style={{height:'6cm'}}><small>11111</small></div>
                                            <div className="text_r px-3" style={{height:'6cm'}}><small>22222</small></div>
                                            <div className="text_r px-3" style={{height:'6cm'}}><small>33333</small></div>
                                            <div className="text_r px-3" style={{height:'6cm'}}><small>44444</small></div>
                                        </td>
                                        <td colspan='6' style={{width: '30cm', height: '30cm', backgroundColor: 'white'}}>
                                            <div id="maptopo" className="mapprint" style={{borderStyle: 'solid', borderWidth: 'thin'}}>
                                                <MapContainer center={[18.76, 100.76]} zoom={8} zoomSnap={1} zoomControl={false} style={{height: '27.5cm', width:'100%'}}>
                                                <TileLayer
                                                    attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                </MapContainer>
                                            </div>
                                        </td>
                                        <td style={{width: '1.05cm'}} className='centercenter'>
                                            <div className="text_l text-center px-2" style={{height:'6cm'}}><small>00000</small></div>
                                            <div className="text_l text-center px-2" style={{height:'6cm'}}><small>11111</small></div>
                                            <div className="text_l text-center px-2" style={{height:'6cm'}}><small>22222</small></div>
                                            <div className="text_l text-center px-2" style={{height:'6cm'}}><small>33333</small></div>
                                            <div className="text_l text-center px-2" style={{height:'6cm'}}><small>44444</small></div>
                                        </td>
                                        <td style={{width: '1.05cm'}}>
                                        </td>
                                        
                                        
                                        
                                        <tr className='text-center' style={{height: '1.05cm'}}>
                                        <td style={{width: '1.05cm'}}></td>
                                        <td style={{width: '1.05cm'}}></td>
                                        <td style={{width: '1.5cm'}}></td>
                                        <td style={{width: '6cm'}}><small>6666</small></td>
                                        <td style={{width: '6cm'}}><small>7777</small></td>
                                        <td style={{width: '6cm'}}><small>8888</small></td>
                                        <td style={{width: '6cm'}}><small>9999</small></td>
                                        <td style={{width: '1.5cm'}}></td>
                                        <td style={{width: '1.05cm'}}></td>
                                        <td style={{width: '1.05cm'}}></td>
                                        </tr>
                                        </table>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        );
        }
    }

}


export default NewMap;