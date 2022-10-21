import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

let mainURL = 'http://localhost:7000';
let loginURL = 'http://localhost:7000/loginresult';

function App() {

  let [post, setPost] = useState(null);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();


  useEffect(()=>{
    axios.get(mainURL).then((res) => {
      setPost(res.data);
      console.log(res.data);
    })
  }, []);

  function getPost(){
    axios.post(loginURL, {
      username,
      password
    }
    ).then((res) => {
      setPost(res.data)
      console.log(res.data);
    })
  }

  if (!post) return "null";

  return (
    <div className="App">
      <h1>TITLE : {post.title}{post.off}</h1>
      
      <Form>
        <Form.Group className="mb-3 px-5">
        <p>Username</p>
          <Form.Control type="email" placeholder="Enter Username" onChange={e => setUserName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3 px-5" controlId="formBasicPassword">
          <p>Password</p>
          <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>

        <Button onClick={getPost} variant='primary'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
