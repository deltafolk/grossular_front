function Footer(){

    const token = localStorage.getItem('token');

    if(token) {
        return (
            <footer className="text-white mt-5 pt-3">   
            <div className="p-1 footer" style={{backgroundColor:'#EEEEEE', color:'#AAAAAA', fontSize:'14px', borderStyle: 'solid none none none', borderColor:'#EEEEEE', borderWidth: '10px'}}>© 2022 Copyright: ศูนย์ภูมิสารสนเทศเพื่อการจัดการต้นน้ำน่าน
            </div>
            </footer>
        );
    } else {
        return (
            <footer className="text-white mt-5 pt-3">   
            <div className="p-1 footer" style={{color:'#555555', fontSize:'14px', borderWidth: '10px'}}>© 2022 Copyright: ศูนย์ภูมิสารสนเทศเพื่อการจัดการต้นน้ำน่าน
            </div>
            </footer>
        );
    }

}

export default Footer;