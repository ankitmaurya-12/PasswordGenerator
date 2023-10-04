import { useRef } from "react";
import { useState, useCallback, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "01234567789";
    }
    if (charAllowed) {
      str += "!@#$%&*()_+-=[]{}";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordTocClipboard = useCallback(()=>{
    passwordRef.current?.select();
    //below one used to highlight only three character in input field
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <Navbar/>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-5 my-14 mt-16 text-black bg-slate-200 p-2">
        <h1 className="text-4xl text-center mb-5 my-1"> <strong>Password</strong>Genrator</h1>
        <div className="flex shadow random-lg overflow-hidden mb-4">
          <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3 bg-white'
          placeholder="Passwrod"
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordTocClipboard}
          className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0">
          Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range" 
            min={6}
            max={35}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>
              Length: {length}
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setNumberAllowed((prev)=> !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={()=>{
              setCharAllowed((prev)=> !prev);
            }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
          <div>
            
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default App;
