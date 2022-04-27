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
          charSelectors[selection] && newCharacters.push(...lowerAlpha);
          break;
        case 'upper':
          charSelectors[selection] && newCharacters.push(...upperAlpha);
          break;
        case 'num':
          charSelectors[selection] && newCharacters.push(...numbers);
          break;
        default: // fix to use the object format

          charSelectors[selection] && newCharacters.push(selection)
      }

    }
    console.log(`new characters: ${newCharacters}`)
    availCharacters = newCharacters

    for (let i = 0; i < 4; i++){
      let password = ""
      for (let i = 0; i < numCharacters; i++){
        password += availCharacters[Math.floor(Math.random() * availCharacters.length)]
      }
      console.log(`password: ${password}`)
      setPasswords(prev => [...prev, password])
    }
    console.log(`passwords: ${passwords}`)
  }
  
  function handleNumCharChange(event){
    setNumCharacters(eval(event.target.value))
  }

  function handleCheck(event){
    let char = event.target.labels[0].innerText
    switch (char){
      case 'uppercase' :
         char = 'upper'
         break
      case 'lowercase' :
         char = 'lower'
         break
      case 'numbers' :
         char = 'num'
         break
      default:
        break
    }
    setCharSelectors(prev => {
      const newValue = {[char]:!prev[char]}
      return {...prev , ...newValue}
    })
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
          <input id='selector-@' type={'checkbox'} checked= {charSelectors['@']} onChange={handleCheck}/>
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

        <button onClick={generateRandom}><img src={lightning} alt=''/>generate password</button>
      </header>
      <div id='passwords'></div>
    </div>
  )
}

export default App;

