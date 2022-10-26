import { useState, useEffect } from '../../node_modules/react/index';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

const [f_off, setF_off] = useState('');
const [f_act, setF_act] = useState('');
const [f_year, setF_year] = useState('');
const [f_amount, setF_amount] = useState('');
const [f_note, setF_note] = useState('');

let [choose, setChoose] = useState('null');

function valueValid(){
    console.log(f_off+" | "+f_act+" | "+f_year+" | "+f_amount+" | "+f_note)
    if (f_off == '' || f_act == '' || f_year == '' || f_amount == ''){
        console.log('กรอกข้อมูลไม่ครบ');
    } else {
        console.log('กรอกข้อมูลแล้ว');
    }
}

function NewPoint(props) {
    let post = props.data;
    return (
        <div>
            <div className='text-center h5 p-1'><img src='images/point.svg' height='40px' width='40px'/> เพิ่มข้อมูลจุด (Point)</div>

            <div className='p-0 '>
            <Form>
            <Form.Group className="input-group my-4 px-2">
            <div className="input-group-prepend"><span className="input-group-text">ชื่อหน่วยงาน</span></div>
                <select onInput={e => setF_off(e.target.value)} className='form-select'>
                <option value="" selected disabled hidden>--- กรุณาเลือก ---</option>
                    {post.off.map((list)=>{

                    return (
                        <option key={uuidv4()} value={list.loginkey}>{list.off}</option>
                    )
                    })}
                </select>
            </Form.Group>
        
            <Form.Group className="input-group my-4 px-2">
            <div className="input-group-prepend"><span className="input-group-text">ชื่อกิจกรรม</span></div>
                <select onInput={e => setF_act(e.target.value)} className='form-select'>
                <option value="" selected disabled hidden>--- กรุณาเลือก ---</option>
                    {post.act.map((list)=>{
                        if (list.acttype == 'point') {
                            return (
                                <option key={uuidv4()} value={list.actkey}>{list.actname}</option>
                            )
                        } else {

                        }
                    })}
                </select>
            </Form.Group>

            <Form.Group className="input-group my-4 px-2">
            <div className="input-group-prepend"><span className="input-group-text">ปีงบประมาณ พ.ศ.</span></div>
                <select onChange={e => setF_year(e.target.value)} className='form-select'>
                    <option value="" selected disabled hidden>--- กรุณาเลือก ---</option>
                    {post.year.map((list)=>{
                        return (
                            <option key={uuidv4()} value={list}>{list}</option>
                        )
                    })}
                </select>
            </Form.Group>

            <Form.Group className="input-group my-4 px-2">
            <div className="input-group-prepend"><span className="input-group-text">จำนวนตามงบประมาณที่ได้รับ (แห่ง)</span></div>
                <Form.Control onChange={e => setF_amount(e.target.value)} type="number" />
            </Form.Group>

            <Form.Group className="input-group my-4 px-2">
            <div className="input-group-prepend"><span className="input-group-text">หมายเหตุ</span></div>
                <input onChange={e => setF_note(e.target.value)} className='form-control' type="text" maxLength="50"/>
            </Form.Group>
        
            <div className='my-4 px-2 text-center'>
            <button className='btn btn-secondary mx-1' onClick={()=>setChoose('null')}>
                ย้อนกลับ
            </button>
            <button className='btn btn-primary mx-1' onClick={valueValid}>
                ถัดไป
            </button>
            </div>

            </Form>
            </div>
        </div>
    )
}

export default NewPoint;