import { useState, useEffect } from '../../node_modules/react/index';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import EditMap from './EditMap'
import Swal from 'sweetalert2'


let editURL = 'http://localhost:7000/edit';
let addURL = 'http://localhost:7000/add_data';

let jsondata = 'n/a';

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

    const addJSON = (input)=>{
        console.log("ข้อมูล -> ",input);
        jsondata = (input)
    }

    function addToDB(){
        axios.put(addURL, {
            token,
            offkey,
            offname,
            actkey,
            actname,
            acttype,
            year,
            amount,
            note,
            jsondata
          }
          ).then((res) => {
            //setPost(res.data)
            //setLoading(false);
            console.log(res.data);
            if (res.data.title == 'completed'){
                Swal.fire({
                    icon: 'success',
                    title: 'เพิ่มข้อมูลในระบบแล้ว',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(()=>{
                    window.location.href = '/item'
                  })
            } else {
                Swal.fire({
                    title: 'เพิ่มข้อมูลล้มเหลว',
                    text: 'มีบางอย่างผิดพลาด กรุณาแจ้งศูนย์ภูมิสารสนเทศฯ',
                    icon: 'error',
                    confirmButtonText: 'ตกลง'
                  }).then(()=>{
                    window.location.href = '/item'
                  })
            }
        })
    }

    function confirmAdd(){
        Swal.fire({
            title: 'บันทึกข้อมูล',
            text: "ข้อมูลจะถูกตรวจสอบการทับซ้อน และบันทึกไปยังฐานข้อมูล ต้องการดำเนินการต่อหรือไม่",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4285F4',
            cancelButtonColor: '#555555',
            cancelButtonText: 'แก้ไขต่อ',
            confirmButtonText: 'บันทึก'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                addToDB()
              )
            }
          })
    }

    function cancelAdd(){
        Swal.fire({
            title: 'ทิ้งข้อมูลนี้',
            text: "ข้อมูลทั้งหมดจะไม่ถูกบันทึก ต้องการดำเนินการต่อหรือไม่",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#CC0000',
            cancelButtonColor: '#555555',
            cancelButtonText: 'แก้ไขต่อ',
            confirmButtonText: 'ทิ้งข้อมูล'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                window.location.href = '/'
              )
            }
          })
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
            <div className='px-3 pb-1'>
                <div className="row">
                    <div className="col-8 text-start px-2 m-0">
                        <div className='text-start pt-0'>
                            <div>{actname} ปี พ.ศ. {year} จำนวน {amount} {checkTypeUnit(acttype)}| <b><u>{offname}</u></b> <a onClick={()=>{alert("test")}} className='btn btn-danger px-3 py-1 my-1'>รายการซ้อนทับ</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 text-end px-2 pt-0 m-0">
                        <span>จำนวนที่คำนวณได้ - {checkTypeUnit(acttype)} <a onClick={()=>{confirmAdd()}} className='btn btn-primary px-3 py-1 my-1'>บันทึก</a> <a onClick={()=>{cancelAdd()}} className='btn btn-secondary px-3 py-1 my-1'>ยกเลิก</a>
                        </span>
                    </div>

                </div>
            </div>
            <EditMap maindb={post} onAddJSON={addJSON} type={acttype}></EditMap>
            </div>
        )
    }
}

export default Edit;