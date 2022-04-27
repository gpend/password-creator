import lightning from './lightning.png';
import './App.css';
import {useState} from 'react'



function App() {

  const [charSelectors, setCharSelectors] = useState({
    '!': true, 
    '@': true,
    '#': true,
    '$': true,
    '%': true,
    '&': true,
    '*': true,
    '?': true,
    'upper': true,
    'lower': true,
    'num': true
  })
  const [numCharacters, setNumCharacters] = useState(10)
  const [passwords, setPasswords] = useState([])

  let availCharacters = []

  function generateRandom (){ 
    let newCharacters = []
    const lowerAlpha = ['a','b','c','d','e','f','g','h','i','j','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const upperAlpha = lowerAlpha.map(char => char.toUpperCase())
    const numbers = [...Array(10).keys()]

    for (let selection in charSelectors){
          
      switch (selection){
        case 'lower':
          charSelectors[selection] && newCharacters.concat(lowerAlpha);
          break;
        case 'upper':
          charSelectors[selection] && newCharacters.concat(upperAlpha);
          break;
        case 'numbers':
          charSelectors[selection] && newCharacters.concat(numbers);
          break;
        default: // fix to use the object format
          charSelectors[selection] && newCharacters.push(selection)
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
  
  function handleNumCharChange(event){
    setNumCharacters(eval(event.target.value))
  }

  function handleCheck(event){
    const char = event.target.labels[0].innerText
    setCharSelectors(prev => {
      const newValue = {[char]:!prev[char]}
      console.log(newValue)
      return {...prev , ...newValue}
    })
    
    // console.log(charSelectors)
  }


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
          <input id='selector-upper' type={'checkbox'} checked= {charSelectors['upper']} onChange={handleCheck}/>
          uppercase
        </label>
        <label>
          <input id='selector-lower' type={'checkbox'} checked= {charSelectors['lower']} onChange={handleCheck}/>
          lowercase
        </label>
        <label>
          <input id='selector-num' type={'checkbox'} checked= {charSelectors['num']} onChange={handleCheck}/>
          numbers
        </label>
        <label>
          <input id='selector-!' type={'checkbox'} checked= {charSelectors['!']} onChange={handleCheck}/>
          !
        </label>
        <label>
          <input id='selector-@' type={'checkbox'} checked= {charSelectors['&']} onChange={handleCheck}/>
          @
        </label>
        <label>
          <input id='selector-$' type={'checkbox'} checked= {charSelectors['$']} onChange={handleCheck}/>
          $
        </label>
        <label>
          <input id='selector-%' type={'checkbox'} checked= {charSelectors['%']} onChange={handleCheck}/>
          %
        </label>
        <label>
          <input id='selector-&' type={'checkbox'} checked= {charSelectors['&']} onChange={handleCheck}/>
          &
        </label>
        <label>
          <input id='selector-*' type={'checkbox'} checked= {charSelectors['*']} onChange={handleCheck}/>
          *
        </label>
        <label>
          <input id='selector-?' type={'checkbox'} checked= {charSelectors['?']} onChange={handleCheck}/>
          ?
        </label>

        <button><img src={lightning} alt=''/>generate password</button>
      </header>
      <div id='passwords'></div>
    </div>
  )
}

export default App;

