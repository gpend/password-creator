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

  const [numCharacters, setNumCharacters] = useState(12)
  const [passwords, setPasswords] = useState(['','','',''])

  let availCharacters = []

  function generateRandom (){ 
    let newCharacters = []
    const lowerAlpha = ['a','b','c','d','e','f','g','h','i','j','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const upperAlpha = lowerAlpha.map(char => char.toUpperCase())
    const numbers = [...Array(10).keys()]
    setPasswords([])

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
        default:
          charSelectors[selection] && newCharacters.push(selection);
      }

    }
    availCharacters = newCharacters

    for (let i = 0; i < 4; i++){
      let password = ""
      for (let i = 0; i < numCharacters; i++){
        password += availCharacters[Math.floor(Math.random() * availCharacters.length)]
      }
      setPasswords(prev => [...prev, password])
    }
  }
  
  function handleNumCharChange(event){
    setNumCharacters(Number(event.target.value))
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

  function PasswordHTML (){
    return (
      passwords.map((password, index) =>{
        return (
          <div className='password' id={`password-${index}`} key={index}>
            <p onClick={()=>{
              navigator.clipboard.writeText(password)
              let passHTML = document.getElementById("password-"+index)
              passHTML.innerHTML += "<p> Password copied</p>"
              setTimeout(() => {
                passHTML.innerHTML = passHTML.innerHTML.slice(0,-23)
              }, 5000);
            }}>{password}</p>
          </div> 
        )
      })
    )
  }

  return (
    <div className="App">
      <header>
        <h1>Generate a <span>random password</span></h1>
        <p>Never use an insecure password again.</p>
        <div className='selectors'>
          <label id='char-num'>
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
          <label>
            <input id='selector-#' type={'checkbox'} checked= {charSelectors['#']} onChange={handleCheck}/>
            #
          </label>
        </div>

        <button onClick={generateRandom}><img src={lightning} alt=''/>generate password</button>
      </header>
      Click to copy the password to your clipboard
      <div id='passwords'>
        <PasswordHTML />
      </div>
    </div>
  )
}

export default App;

//Click to copy the password to your clipboard // should be tap at smaller media sizes