import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
} from "react-router-dom";

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

  setTimeout(() => {
    setAlert(null)
  }, 1500);
  }

  const [mode, setMode] = useState('light')

  const toogleMode = () => {
    if(mode === 'light'){

      setMode('dark')
      document.body.style.backgroundColor ='black';
      showAlert("Dark Mode has been enabled", "success")
    }
    else{
      setMode('light')
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode has been enabled", "success")

    }
  }

  return (
      <>
      <Router>
        <Navbar title= "Logo" mode={mode} toogleMode = {toogleMode} />
          <Alert alert={alert} />
        <Routes>
            <Route exact path="/about" element={<About mode={mode} />} />
            <Route exact path="/" element={<TextForm heading="Text Area" mode={mode} />} />
        </Routes>

      </Router>
      </>
  );
}

export default App;
