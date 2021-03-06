import lightning from './lightning.png';
import './App.css';
import { useState } from 'react';

function App() {
  const [charSelectors, setCharSelectors] = useState({
    '!': true,
    '@': true,
    '#': true,
    $: true,
    '%': true,
    '&': true,
    '*': true,
    '?': true,
    upper: true,
    lower: true,
    num: true,
  });

  // console.log(Object.keys(charSelectors));

  const [numCharacters, setNumCharacters] = useState(12);
  const [passwords, setPasswords] = useState(['...', '...', '...', '...']);

  let availCharacters = [];

  function generateRandomPassword() {
    let newCharacters = [];
    const lowerAlpha = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    const upperAlpha = lowerAlpha.map((char) => char.toUpperCase());
    const numbers = [...Array(10).keys()];
    setPasswords([]);

    for (let selection in charSelectors) {
      switch (selection) {
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
    availCharacters = newCharacters;

    for (let i = 0; i < 4; i++) {
      let password = '';
      if (availCharacters.length < 6) {
        console.log(availCharacters.length);
        password = 'really?';
      } else {
        for (let i = 0; i < numCharacters; i++) {
          password +=
            availCharacters[Math.floor(Math.random() * availCharacters.length)];
        }
      }

      setPasswords((prev) => [...prev, password]);
    }
  }

  function handleNumCharChange(event) {
    setNumCharacters(Number(event.target.value));
  }

  function handleCheck(event) {
    let char = event.target.labels[0].innerText;
    switch (char) {
      case 'uppercase':
        char = 'upper';
        break;
      case 'lowercase':
        char = 'lower';
        break;
      case 'numbers':
        char = 'num';
        break;
      default:
        break;
    }
    setCharSelectors((prev) => {
      const newValue = { [char]: !prev[char] };
      return { ...prev, ...newValue };
    });
  }

  function PasswordHTML() {
    return passwords.map((password, index) => {
      return (
        <div className='password-box' id={`password-${index}`} key={index}>
          <div className='password'>
            <p
              onClick={() => {
                navigator.clipboard.writeText(password);
                let passHTML = document.getElementById('password-' + index);
                passHTML.classList.add('password-clicked');
                setTimeout(() => {
                  passHTML.classList.remove('password-clicked');
                }, 5000);
              }}
            >
              {password}
            </p>
          </div>
        </div>
      );
    });
  }

  function SelectorHTML() {
    return Object.keys(charSelectors).map((charKey) => {
      let labelText;
      switch (charKey) {
        case 'lower':
          labelText = 'lowercase';
          break;
        case 'upper':
          labelText = 'uppercase';
          break;
        case 'num':
          labelText = 'numbers';
          break;
        default:
          labelText = charKey;
      }

      return (
        <label key={charKey}>
          <input
            id={`selector-${charKey}`}
            type={'checkbox'}
            checked={charSelectors[charKey]}
            onChange={handleCheck}
          />
          {labelText}
        </label>
      );
    });
  }

  return (
    <div className='App'>
      <header>
        <h1>
          Generate a <span>random password</span>
        </h1>
        <p>Never use an insecure password again.</p>
        <label id='char-num'>
          <span>Number of characters</span>
          <input
            type={'number'}
            min='1'
            max='20'
            value={numCharacters}
            onChange={handleNumCharChange}
          />
        </label>

        <div className='selectors'>
          <SelectorHTML />
        </div>

        <button onClick={generateRandomPassword}>
          <img src={lightning} alt='' />
          Generate Password
        </button>
      </header>
      Click to copy the password to your clipboard
      <div id='passwords'>
        <PasswordHTML />
      </div>
    </div>
  );
}

export default App;

//Click to copy the password to your clipboard // should be tap at smaller media sizes
