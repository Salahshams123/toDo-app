import React,{useState} from "react";
import {AiOutlineStar} from 'react-icons/ai'
import "./App.css";
const App = () =>{
 const [uName,setuName] = useState("");
 const [isDone,setisDone] = useState("");
 const [date,setdate] = useState("");
 const [names,setnames] = useState([]);
 const [favorits,setfavorits] = useState([]);

 //Add data from inputs
const namesHandelar2 = (e) =>{
  e.preventDefault();
  const data = {uName,isDone,date};
  if(uName && isDone && date){
    const name = data.uName;
    let c = 0;
     names.forEach(o =>{
        if(o.uName ===  name){
          c+=1;
        }
      });
      if(c===0){
        setnames((is)=>[...is,data]);
        setuName("");
        setisDone("");
        setdate("");
      }
  } 
};
//delete data
const deletefun = (e,idxf) =>{                                                                  
  setnames((names) =>{
   return names.filter((el,idx) => idx !==idxf)
  });
 }
 // toggel is done?
const isDoneToggel = (index) =>{
 const user = names[index];
 if( user.isDone === "true"){
  user.isDone = "false";
  setnames([...names.slice(0,index),user,...names.slice(index + 1,names.length)]);
 }
 else{
  user.isDone = "true";
  setnames([...names.slice(0,index),user,...names.slice(index + 1,names.length)]);
 }
 };

 //add names to favorits
 const favoritsNames = (e) =>{
  const arr = names[e];
  let name = arr.uName;
    if( favorits.indexOf(name) !== -1 ){
      setfavorits((favorits) =>{
        return favorits.filter((el,idx) => el !== name)
       });
    }
    else{
      setfavorits((is)=>[...is,name]); 
    }
  
  
};

  return ( 

    <div>
  <div className="header1"><h1>To Do List</h1> </div>
    <div className="parent">
    <div className="left">
    
    {
    names.map((a,idx) =>(
      <div className="cardWraper"  >
      <div className="ri">
      <div className={ a.isDone==="true"? "ah" : "bh" } >{a.uName}</div>
      <div className="butons" >
      <button className="ico" onClick={()=>favoritsNames(idx)}><AiOutlineStar /></button>
      <button onClick={()=>isDoneToggel(idx)} className="tog">toggel</button>
      <button onClick={(e) => deletefun(e,idx) } className="del">delete</button>
      </div>
      </div>
      </div>
    ))
    }
   </div>
    <div className="right">
    <form onSubmit={namesHandelar2} className='mp'>
   <input type="text" placeholder="write your name " value={uName} onChange={ (e)=> setuName(e.target.value)} /> 
    <input type="text" placeholder="Is done ? true || false" value={isDone} onChange={ (e)=> setisDone(e.target.value)} /> 
    <input type="date" placeholder="write date" value={date} onChange={ (e)=> setdate(e.target.value)} /> 
    <button> add </button>
   
    </form>
    
    <div className="favorit">
    <h3>favorits</h3>
    {
      favorits.map((a,idx) =>(
        <div className="smallfav">
       <div>{a}</div>
        </div>
      ))
      }
    </div>
    </div>
    </div>
    </div>
  );
};

export default App ;