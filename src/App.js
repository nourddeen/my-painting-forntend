import './App.css';
import { BrowserRouter , Router, Link, Switch, Route } from 'react-router-dom';
import MainContainer from './mainContainer/mainContainer';

function App() {
  return (
    <div className="App">
      <h1>My Painting</h1>
      <MainContainer />
    </div>
  );
}

export default App;
