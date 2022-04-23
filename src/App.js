import lightning from './lightning.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Generate a <span>random password</span></h1>
        <h3>Never use an insecure password again.</h3>
        <button><img src={lightning} alt='lightning'/>generate password</button>
      </header>
      <div id='passwords'></div>
    </div>
  )
}

export default App;
