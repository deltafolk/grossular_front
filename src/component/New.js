import { useState, useEffect } from '../../node_modules/react/index';
import './../App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

let newURL = 'http://localhost:7000/new';

function New(){

    let [post, setPost] = useState(null);
    const [isLoading, setLoading] = useState(true);

    let [choose, setChoose] = useState('null');

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const token = localStorage.getItem('token');
    const offkey = localStorage.getItem('offkey');
    const offname = localStorage.getItem('offname');

    useEffect(()=>{
        axios.post(newURL, {
            username,
            password
          }
          ).then((res) => {
            setPost(res.data)
            setLoading(false);
            console.log(res.data);
        })
    }, []);

    if (isLoading) {
        return (
            <div className='pt-5'>
            <center><div class="loader"></div></center>
            <div style={{backgroundColor: "#EEEEEE", height: '100vh'}} className="m-3 text-center h5">กรุณารอสักครุ่...</div>
            </div>
            )
    } 
    
    else {

    if(token) {
        if (choose == 'null') {
            return (
                        <div>
                            <div className="container d-flex justify-content-center mt-4" style={{display:'none'}}>
                                <div className="bg-light p-1 rounded-3 shadow border" style={{height: 'auto', width: '100%'}}>
                                    <div className="text-end p-2"><img src='images/user.png' height='25px' width='25px'/> {offname} </div>
                                    <div className='text-center h5 p-1'><img src='images/layer.svg' height='40px' width='40px'/> เพิ่มข้อมูล</div>

                                    <div className='p-0 '>
                                    <div className='row'>
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-8">    
                                        <div className='text-start'><a className='btn btn-light button-primary-override my-3' onClick={()=>setChoose('point')}><img src='images/point.svg' height='40px' width='40px' /> ข้อมูลแบบจุด (Point)</a><div className='ps-2' style={{fontSize:'12px', color:'#888888'}}><u>ข้อมูลแบบจุด</u> เช่น จุดก่อสร้างฝาย จุดอาคารและสิ่งปลูกสร้าง ตำแหน่งหมู่บ้าน</div></div>
                                        <div className='text-start'><a className='btn btn-light button-primary-override my-3' onClick={()=>setChoose('line')}><img src='images/line.svg' height='40px' width='40px' /> ข้อมูลแบบเส้น (Line)</a><div className='ps-2' style={{fontSize:'12px', color:'#888888'}}><u>ข้อมูลแบบเส้น</u> เช่น เส้นแนวกันไฟ เส้นทางคมนาคม เส้นทางน้ำ</div></div>
                                        <div className='text-start'><a className='btn btn-light button-primary-override my-3' onClick={()=>setChoose('polygon')}><img src='images/polygon.svg' height='40px' width='40px' /> ข้อมูลแบบรูปปิด (Polygon)</a><div className='ps-2' style={{fontSize:'12px', color:'#888888'}}><u>ข้อมูลแบบรูปปิด</u> เช่น แปลงปลูก พื้นที่ของอาคารและสิ่งปลูกสร้าง แหล่งน้ำ</div></div>
                                        <div className='text-start'><a className='btn btn-light button-primary-override my-3' onClick={()=>setChoose('upload')}><img src='images/shp.svg' height='40px' width='40px' /> ข้อมูล Shape file (.zip)</a><div className='ps-2' style={{fontSize:'12px', color:'#888888'}}><u>ข้อมูล Shape file</u> เพิ่มข้อมูล Shape file เดิมที่มีอยู่แล้ว จาก ArcGIS หรือ QGIS เป็นต้น</div></div>
                                        <div className='p-3'/>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            );
        } else if (choose == 'point'){
            return (
                <div>
                    <div className="container d-flex justify-content-center mt-4" style={{display:'none'}}>
                        <div className="bg-light p-1 rounded-3 shadow border" style={{height: 'auto', width: '100%'}}>
                            <div className="text-end p-2"><img src='images/user.png' height='25px' width='25px'/> {offname} </div>
                            <div className='text-center h5 p-1'><img src='images/point.svg' height='40px' width='40px'/> เพิ่มข้อมูลจุด (Point)</div>

                            <div className='p-0 '>
                            <Form>
                            <Form.Group className="input-group my-4 px-2">
                            <div className="input-group-prepend"><span className="input-group-text">ชื่อหน่วยงาน</span></div>
                                <select className='form-select'>
                                    {post.off.map((list)=>{

                                    return (
                                        <option value={list.loginkey}>{list.off}</option>
                                    )
                                    })}
                                </select>
                            </Form.Group>
                    
                            <Form.Group className="input-group my-4 px-2">
                            <div className="input-group-prepend"><span className="input-group-text">ชื่อกิจกรรม</span></div>
                                <select className='form-select'>
                                    {post.act.map((list)=>{
                                        if (list.acttype == 'point') {
                                            return (
                                                <option value={list.actkey}>{list.actname}</option>
                                            )
                                        } else {

                                        }
                                    })}
                                </select>
                            </Form.Group>

                            <Form.Group className="input-group my-4 px-2">
                            <div className="input-group-prepend"><span className="input-group-text">ปีงบประมาณ พ.ศ.</span></div>
                                <select className='form-select'>
                                    {post.year.map((list)=>{
                                        return (
                                            <option value={list}>{list}</option>
                                        )
                                    })}
                                </select>
                            </Form.Group>

                            <Form.Group className="input-group my-4 px-2">
                            <div className="input-group-prepend"><span className="input-group-text">จำนวนตามงบประมาณที่ได้รับ (แห่ง)</span></div>
                                <Form.Control type="number" />
                            </Form.Group>

                            <Form.Group className="input-group my-4 px-2">
                            <div className="input-group-prepend"><span className="input-group-text">หมายเหตุ</span></div>
                                <input className='form-control' type="text" maxLength="50"/>
                            </Form.Group>
                    
                            <div className='my-4 px-2 text-center'>
                            <button className='btn btn-secondary mx-1' onClick={()=>setChoose('null')}>
                                ย้อนกลับ
                            </button>
                            <button className='btn btn-primary mx-1' onClick={null}>
                                ถัดไป
                            </button>
                            </div>

                            </Form>
                            </div>
                        </div>
                    </div>
                </div>
    );
        } else if (choose == 'line'){
            return (
                <div>
                <div className="container d-flex justify-content-center mt-4" style={{display:'none'}}>
                    <div className="bg-light p-1 rounded-3 shadow border" style={{height: 'auto', width: '100%'}}>
                        <div className="text-end p-2"><img src='images/user.png' height='25px' width='25px'/> {offname} </div>
                        <div className='text-center h5 p-1'><img src='images/line.svg' height='40px' width='40px'/> เพิ่มข้อมูลเส้น (Line)</div>

                        <div className='p-0 '>
                        <Form>
                        <Form.Group className="input-group my-4 px-2">
                        <div className="input-group-prepend"><span className="input-group-text">ชื่อหน่วยงาน</span></div>
                            <select className='form-select'>
                                {post.off.map((list)=>{

                                return (
                                    <option value={list.loginkey}>{list.off}</option>
                                )
                                })}
                            </select>
                        </Form.Group>
                
                        <Form.Group className="input-group my-4 px-2">
                        <div className="input-group-prepend"><span className="input-group-text">ชื่อกิจกรรม</span></div>
                            <select className='form-select'>
                                {post.act.map((list)=>{
                                    if (list.acttype == 'line') {
                                        return (
                                            <option value={list.actkey}>{list.actname}</option>
                                        )
                                    } else {

                                    }
                                })}
                            </select>
                        </Form.Group>

                        <Form.Group className="input-group my-4 px-2">
                        <div className="input-group-prepend"><span className="input-group-text">ปีงบประมาณ พ.ศ.</span></div>
                            <select className='form-select'>
                                {post.year.map((list)=>{
                                    return (
                                        <option value={list}>{list}</option>
                                    )
                                })}
                            </select>
                        </Form.Group>

                        <Form.Group className="input-group my-4 px-2">
                        <div className="input-group-prepend"><span className="input-group-text">จำนวนตามงบประมาณที่ได้รับ (กิโลเมตร)</span></div>
                            <Form.Control type="number" />
                        </Form.Group>

                        <Form.Group className="input-group my-4 px-2">
                        <div className="input-group-prepend"><span className="input-group-text">หมายเหตุ</span></div>
                            <input className='form-control' type="text" maxLength="50"/>
                        </Form.Group>
                
                        <div className='my-4 px-2 text-center'>
                        <button className='btn btn-secondary mx-1' onClick={()=>setChoose('null')}>
                            ย้อนกลับ
                        </button>
                        <button className='btn btn-primary mx-1' onClick={null}>
                            ถัดไป
                        </button>
                        </div>

                        </Form>
                        </div>
                    </div>
                </div>
            </div>
            )
        } else if (choose == 'polygon'){
            return (
                <div>
                <div className="container d-flex justify-content-center mt-4" style={{display:'none'}}>
                    <div className="bg-light p-1 rounded-3 shadow border" style={{height: 'auto', width: '100%'}}>
                        <div className="text-end p-2"><img src='images/user.png' height='25px' width='25px'/> {offname} </div>
                        <div className='text-center h5 p-1'><img src='images/polygon.svg' height='40px' width='40px'/> เพิ่มข้อมูลรูปปิด (Polygon)</div>

                        <div className='p-0 '>
                        <Form>
                        <Form.Group className="input-group my-4 px-2">
                        <div className="input-group-prepend"><span className="input-group-text">ชื่อหน่วยงาน</span></div>
                            <select className='form-select'>
                                {post.off.map((list)=>{

                                return (
                                    <option value={list.loginkey}>{list.off}</option>
                                )
                                })}
                            </select>
                        </Form.Group>
                
                        <Form.Group className="input-group my-4 px-2">
                        <div className="input-group-prepend"><span className="input-group-text">ชื่อกิจกรรม</span></div>
                            <select className='form-select'>
                                {post.act.map((list)=>{
                                    if (list.acttype == 'polygon') {
                                        return (
                                            <option value={list.actkey}>{list.actname}</option>
                                        )
                                    } else {

                                    }
                                })}
                            </select>
                        </Form.Group>

                        <Form.Group className="input-group my-4 px-2">
                        <div className="input-group-prepend"><span className="input-group-text">ปีงบประมาณ พ.ศ.</span></div>
                            <select className='form-select'>
                                {post.year.map((list)=>{
                                    return (
                                        <option value={list}>{list}</option>
                                    )
                                })}
                            </select>
                        </Form.Group>

                        <Form.Group className="input-group my-4 px-2">
                        <div className="input-group-prepend"><span className="input-group-text">จำนวนตามงบประมาณที่ได้รับ (ไร่)</span></div>
                            <Form.Control type="number" />
                        </Form.Group>

                        <Form.Group className="input-group my-4 px-2">
                        <div className="input-group-prepend"><span className="input-group-text">หมายเหตุ</span></div>
                            <input className='form-control' type="text" maxLength="50"/>
                        </Form.Group>
                
                        <div className='my-4 px-2 text-center'>
                        <button className='btn btn-secondary mx-1' onClick={()=>setChoose('null')}>
                            ย้อนกลับ
                        </button>
                        <button className='btn btn-primary mx-1' onClick={null}>
                            ถัดไป
                        </button>
                        </div>

                        </Form>
                        </div>
                    </div>
                </div>
            </div>
            )
        } else {
            return <div>upload shape</div>
        }

    } 
    else 
    {
        window.location.href = "/";
    }

    }

}

export default New;