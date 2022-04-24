import lightning from './lightning.png';
import './App.css';
import {useState, useEffect} from 'react'

// let characters = []

function App() {

  const [charSelectors, setCharSelectors] = useState([])
  
  useEffect(()=>{
    let newCharacters = []
    const lowerAlpha = ['a','b','c','d','e','f','g','h','i','j','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const upperAlpha = lowerAlpha.map(char => char.toUpperCase())
    const numbers = [...Array(10).keys()]

    for (let selection of charSelectors){
          
      switch (selection){
        case 'lower':
          newCharacters.concat(lowerAlpha);
          break;
        case 'upper':
          newCharacters.concat(upperAlpha);
          break;
        case 'numbers':
          newCharacters.concat(numbers);
          break;
        default:
          newCharacters.push(selection)
      }

    }
    
    setCharSelectors(newCharacters)

  },[charSelectors]) // will cause loop, find something else to link it to
  

  return (
    <div className="App">
      <header>
        <h1>Generate a <span>random password</span></h1>
        <h3>Never use an insecure password again.</h3>
        <label>
          <input type={'checkbox'}/>
          uppercase
        </label>
        <label>
          <input type={'checkbox'}/>
          lowercase
        </label>
        <label>
          <input type={'checkbox'}/>
          !
        </label>
        <label>
          <input type={'checkbox'}/>
          @
        </label>
        <label>
          <input type={'checkbox'}/>
          $
        </label>
        <label>
          <input type={'checkbox'}/>
          %
        </label>
        <label>
          <input type={'checkbox'}/>
          &
        </label>
        <label>
          <input type={'checkbox'}/>
          *
        </label>

        <button><img src={lightning} alt='lightning'/>generate password</button>
      </header>
      <div id='passwords'></div>
    </div>
  )
}

export default App;

