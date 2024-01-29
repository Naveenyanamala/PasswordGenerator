
import { useCallback, useState, useEffect,useRef } from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState(8);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password , setPassword] = useState("");

  const passwordRef =useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(NumberAllowed)str+="0123456789";
    if(charAllowed)str+="!@#$%^&*(){}[]~";

    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,NumberAllowed,charAllowed,setPassword])

  const CopyToBoard = useCallback (() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    PasswordGenerator()
  },
  [length,NumberAllowed,charAllowed,PasswordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
     <h1 className='text-4xl text-center my-3'> Password Generator</h1>
     <div className=' flex shadow rounded-lg overflow-hidden mb-4'>
      <input
      type='text'
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password' 
      readOnly
      ref={passwordRef}
      />
      <button 
      onClick={CopyToBoard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'> copy</button>
     </div>

     <div className=' flex text-sm gap-x-2'>

      <div className='flex items-center gap-x-1'>
        <input
        type='range'
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setlength(e.target.value)}}
        />
        <label>length:{length}</label>
      </div>
      
      <div className='flext items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={NumberAllowed}
        id='numbeinput'
        onChange={() => {setNumberAllowed((prev) => !prev)}}
        />
        <label>NumberAllowed</label>
      </div>

      <div className='flext items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={charAllowed}
        id='character input'
        onChange={() => {setCharAllowed((prev) => !prev)}}
        />
        <label>charAllowed</label>
      </div>
     </div>


    </div>
  );
}

export default App;
