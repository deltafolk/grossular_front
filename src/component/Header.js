import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import logo from './../images/logo1.png';

function Header(){

    function logout(){
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    const token = localStorage.getItem('token');

    if(token) {
        return (
            <Nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="container">
                    <p className="nav-band text-white h2">
                        <a href='http://gisnan.ddnsthailand.com:8080'>
                            <img src={logo} style={{height:'40px', width:'190px'}} />
                        </a>
                    </p>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navTogg">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navTogg">
                    <ul className="navbar-nav">
                        <li className='nav-item'><a href='/new' className='nav-link btn btn-dark'>เพิ่มข้อมูล</a></li>
                        <li className='nav-item'><a href='/item' className='nav-link btn btn-dark'>รายการข้อมูล</a></li>
                            <li className='nav-item dropdown text-center'>
                                <a className='nav-link dropdown-toggle' href='#' id='navbarDropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                เครื่องมือ
                                </a>
                                <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                                    <a className='dropdown-item' href='#'>ข้อมูลเชิงพื้นที่จากตำแหน่งของฉัน</a>
                                    <a className='dropdown-item' href='#'>แปลงระบบพิกัด</a>
                                    <a className='dropdown-item' href='#'>รีเซ็ทระบบแนะนำ</a>
                                    <a className='dropdown-item' href='#'>รายงานข้อผิดพลาด</a>
                                </div>
                            </li>
                        <li className='nav-item'><a onClick={logout} className='nav-link btn btn-dark'>ออกจากระบบ</a></li>  

                    </ul>
                    </div>
                </div>
            </Nav>
        );
    } else {
        return (
            <Nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <p className="nav-band text-white h2">
                        <a href='http://gisnan.ddnsthailand.com:8080'>
                            <img src={logo} style={{height:'40px', width:'190px'}} />
                        </a>
                    </p>
                </div>
            </Nav>
        )
    }

}

export default Header;