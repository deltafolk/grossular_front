import { useState, useEffect } from '../../node_modules/react/index';
import './../App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

let loginURL = 'http://localhost:7000/loginresult';

function Login(){

    let [post, setPost] = useState(null);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const token = localStorage.getItem('token');

    function getPost(){
        axios.post(loginURL, {
          username,
          password
        }
        ).then((res) => {
          setPost(res.data)
          //console.log(res.data);
    
          if ('token' in res.data) {
    
            localStorage.setItem('token', res.data['token']);
            localStorage.setItem('offkey', res.data['offkey']);
            localStorage.setItem('offname', res.data['offname']);
            window.location.href = "/item";
      
          } else {

            Swal.fire({
                title: 'เข้าสู่ระบบล้มเหลว',
                text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
                icon: 'error',
                confirmButtonText: 'ตกลง'
              })

          }
    
        })
    }

    if(!token) {
    return (
    
        <div className='container d-flex justify-content-center mt-3 text-center'>
        <div className="bg-light p-2 rounded-3 shadow border mt-5" style={{height: 'auto', width: '420px'}}>
        <div className='h2 my-5'>เข้าสู่ระบบ</div>
        
        <Form>
          <Form.Group className="input-group my-4 px-2">
          <div className="input-group-prepend"><span className="input-group-text">ชื่อผู้ใช้</span></div>
            <Form.Control type="email" placeholder="Enter Username" onChange={e => setUserName(e.target.value)}/>
          </Form.Group>
  
          <Form.Group className="input-group my-4 px-2">
          <div className="input-group-prepend"><span className="input-group-text">รหัสผ่าน</span></div>
            <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)}/>
          </Form.Group>
  
          <Button onClick={getPost} variant='primary'>
            เข้าสู่ระบบ
          </Button>
          <div className='text-start mt-5 px-2 text-secondary' style={{fontSize:'14px'}}>* หากต้องการใช้งาน กรุณาติดต่อ ศูนย์ภูมิสารสนเทศเพื่อการจัดการต้นน้ำน่าน</div>
        </Form>
        </div>
      </div>
    );
    } else {
        window.location.href = "/item";
    }

}

export default Login;