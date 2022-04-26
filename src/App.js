import lightning from './lightning.png';
import './App.css';
import {useState} from 'react'



function App() {

  const [charSelectors, setCharSelectors] = useState({'!': true, '@': true})
  const [numCharacters, setNumCharacters] = useState(10)
  const [passwords, setPasswords] = useState([])

  let availCharacters = []

  function generateRandom (){ 
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
    availCharacters = newCharacters

    for (let i = 0; i < 4; i++){
      let password = ""
      for (let i = 0; i < numCharacters; i++){
        password.concat(availCharacters[Math.floor(Math.random() * availCharacters.length)])
      }
      setPasswords(prev => [...prev, password])
    }
  }
  
  function handleNumCharChange(e){
    setNumCharacters(eval(e.target.value))
  }

  console.log(charSelectors['!'])

  return (
    <div className="App">
      <header>
        <h1>Generate a <span>random password</span></h1>
        <h3>Never use an insecure password again.</h3>
        <label>
          Number of characters
          <input type={'number'} min= '1' max='20' value= {numCharacters} onChange={handleNumCharChange}/>
        </label>
        <label>
          <input id='selector-upper' type={'checkbox'} value="on"/>
          uppercase
        </label>
        <label>
          <input id='selector-lower' type={'checkbox'}/>
          lowercase
        </label>
        <label>
          <input id='selector-num' type={'checkbox'} defaultChecked= {true}/>
          numbers
        </label>
        <label>
          <input id='selector-!' type={'checkbox'} value="on"/>
          !
        </label>
        <label>
          <input id='selector-@' type={'checkbox'} value="on"/>
          @
        </label>
        <label>
          <input id='selector-$' type={'checkbox'} value="on"/>
          $
        </label>
        <label>
          <input id='selector-%' type={'checkbox'} value="on"/>
          %
        </label>
        <label>
          <input id='selector-&' type={'checkbox'} value="on"/>
          &
        </label>
        <label>
          <input id='selector-*' type={'checkbox'} value="on"/>
          *
        </label>

        <button><img src={lightning} alt=''/>generate password</button>
      </header>
      <div id='passwords'></div>
    </div>
  )
}

export default App;

