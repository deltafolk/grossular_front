import { useState, useEffect } from '../../node_modules/react/index';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import EditMap from './EditMap'

let editURL = 'http://localhost:7000/edit';

function Edit(props) {

    const token = localStorage.getItem('token');
    let [post, setPost] = useState([{}]);
    const [isLoading, setLoading] = useState(true);

    console.log(props.data)
    let arroff = (props.data.off).split(",")
    let arract = (props.data.act).split(",")

    let offkey = arroff[0];
    let offname = arroff[1];
    let actkey = arract[0];
    let actname = arract[1];
    let acttype = arract[2];
    let year = props.data.year;
    let amount = props.data.amount;
    let note = props.data.note;
    let jsondata = "n/a";

    useEffect(()=>{
        axios.post(editURL, {
            token,
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
            <center><div className="loader"></div></center>
            <div className="m-3 text-center h5">กำลังเตรียมฐานข้อมูล กรุณารอสักครุ่...</div>
            </div>
            )
    } else {
        return (
            <div>
            <div className='px-3'>
                <div className="row">
                    <div className="col-8 text-start px-2 m-0">
                        <div className='text-start pt-0'>
                            <div>{actname} ปี พ.ศ. {year} จำนวน {amount} | <b><u>{offname}</u></b> <a onClick={()=>{alert("test")}} className='btn btn-danger px-3 py-1 my-1'>รายการซ้อนทับ</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 text-end px-2 pt-0 m-0">
                        <span>จำนวนที่คำนวณได้ - <a onClick={()=>{alert("test")}} className='btn btn-primary px-3 py-1 my-1'>บันทึก</a> <a onClick={null} className='btn btn-secondary px-3 py-1 my-1'>ยกเลิก</a>
                        </span>
                    </div>
                </div>
            </div>
            <EditMap></EditMap>
            </div>
        )
    }
}

export default Edit;