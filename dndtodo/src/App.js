import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation';
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd'
import fetchApi from './extra';
function App() {
  
const [todo,setTodo]=useState([]);
const [tiplist,setTip]=useState([]);
const [cplist,setCp]=useState([]);
const [task,setTask]=useState('');
useEffect(()=>{

},[todo])



const addTask=(e)=>{ 
  e.preventDefault()  
  var length=todo.length+1;
  if(task!==""){
    var add_data_to_list = {'id':""+length,'text':task}
    setTodo(current => [...current,add_data_to_list])
    setTask('') 
  }
  else{
    alert('Type a valid task')
  }
  addDataToServer(JSON.stringify(todo),JSON.stringify(tiplist),JSON.stringify(cplist))

}
function handleOnDragEnd(result){
  handleDrag(result);
  addDataToServer(JSON.stringify(todo),JSON.stringify(tiplist),JSON.stringify(cplist))

}


function handleDrag(result) { 
  if(result.source.droppableId=="todos" && result.destination.droppableId=="tips" ){
    const items = Array.from(todo);
    const items2=Array.from(tiplist)
    const [reorderedItem] = items.splice(result.source.index, 1);  
    setTodo(items)
    if(items2.length>0){
     
      items2.splice(result.destination.index,0,reorderedItem);
      setTip(items2)
    }else{
      setTip(current => [...current,reorderedItem])
    } 
  } 
  else if(result.source.droppableId=="tips" && result.destination.droppableId=="todos" ){
    const items = Array.from(tiplist);
    const items2=Array.from(todo)
    const [reorderedItem] = items.splice(result.source.index, 1);  
    setTip(items)
    if(items2.length>0){
     
      items2.splice(result.destination.index,0,reorderedItem);
      setTodo(items2) 
    }else{
      setTodo(current => [...current,reorderedItem]) 
    } 
  }
   
  else if(result.source.droppableId=="todos" && result.destination.droppableId=="done" ){
    const items = Array.from(todo);
    const items2=Array.from(cplist)
    const [reorderedItem] = items.splice(result.source.index, 1);  
    setTodo(items)
    if(items2.length>0){
     
      items2.splice(result.destination.index,0,reorderedItem);
      setCp(items2) 
    }else{
      setCp(current => [...current,reorderedItem])
    } 
  }
  else if(result.source.droppableId=="tips" && result.destination.droppableId=="done" ){
    const items = Array.from(tiplist);
    const items2=Array.from(cplist)
    const [reorderedItem] = items.splice(result.source.index, 1); 
    setTip(items)
    if(items2.length>0){
     
      items2.splice(result.destination.index,0,reorderedItem);
      setCp(items2) 
    }else{
      setCp(current => [...current,reorderedItem])
    } 
  }
  else if(result.source.droppableId=="done" && result.destination.droppableId=="tips" ){
    const items = Array.from(cplist);
    const items2 = Array.from(tiplist);

    const [reorderedItem] = items.splice(result.source.index, 1); 
    setCp(items)
    if(items2.length>0){
      items2.splice(result.destination.index,0,reorderedItem);
      setTip(items2) 
    }else{
      setTip(current => [...current,reorderedItem])
    } 
    
  }
  else if(result.source.droppableId=="done" && result.destination.droppableId=="todos" ){
    const items = Array.from(cplist);
    const items2 = Array.from(todo);

    const [reorderedItem] = items.splice(result.source.index, 1); 
    setCp(items)
    if(items2.length>0){
     
      items2.splice(result.destination.index,0,reorderedItem);
      setTodo(items2) 
    }else{
      setTodo(current => [...current,reorderedItem]) 
    } 
  }
  else if(result.source.droppableId==result.destination.droppableId){
    if(result.destination.droppableId=="tips"){
    const items = Array.from(tiplist);
    const [reorderedItem] = items.splice(result.source.index, 1);  
    items.splice(result.destination.index, 0, reorderedItem);
    setTip(items)
    }else if(result.destination.droppableId=="todos"){
      const items = Array.from(todo);
      const [reorderedItem] = items.splice(result.source.index, 1);  
      items.splice(result.destination.index, 0, reorderedItem);
      setTodo(items)
    }else if(result.destination.droppableId=="done"){
      const items = Array.from(cplist);
      const [reorderedItem] = items.splice(result.source.index, 1);  
      items.splice(result.destination.index, 0, reorderedItem);
      setCp(items)
    }
    else return

  }
  else if(result.draggableId==null){
    alert('cant drop here')
  }

  else return
   
}  

const  addDataToServer= async(todo,tip,cp)=>{
  const todo_data=await{todo_data:{todo,tip,cp}}
 //console.log(todo_data)
 const res=await fetchApi.doApi("api/addTodo",'POST',todo_data,0);
 console.log(res)
}


  return (
    <>
      <form>
      <div className='  d-flex justify-content-center col-md-12 mb-2 mt-4'>
        
          <input className='col-md-3 d-flex justify-content-around' type='text'value={task} onChange={(e)=>setTask(e.target.value)} placeholder="Write your task"/>
          <button type='submit' onClick={(e)=>addTask(e)} className='col-md-2 tbutton'>Add</button>
       
      </div>
      </form>
       
      <div className='row'>
      <DragDropContext  onDragEnd={handleOnDragEnd}>
          <div className='cart col-md-3'>
            <div className='card-title '>
              <h3 className='ct d-flex justify-content-center'>Todo list</h3>
            </div>
            <div className='card-body'>
                <Droppable droppableId='todos'>
                  {(provided) =>(
                  <ul className='todos' {...provided.droppableProps} ref={provided.innerRef}>
                    {!todo?<></>:todo.map(({id,text},index)=>{
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided)=>(  
                          <li className='ltodo  mt-2 d-flex justify-content-center' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                             <div> <p>{text}</p></div>
                          </li>
                          
                          )}
                          
                        </Draggable>
                      );
                      
                    })}
                       {provided.placeholder}
                  </ul>
                  )}
                </Droppable>
                </div>
          </div>
          <div className='cart col-md-3'>
            <div className='card-title'>
              <h3 className='ct d-flex justify-content-center'>Task In Progress</h3>
            </div>
            <div className='card-body'>

                <Droppable droppableId='tips' >
                  {(provided) =>(
                  <ul className='tips' {...provided.droppableProps} ref={provided.innerRef}>
                    {!tiplist?<></>:tiplist.map(({id,text},index)=>{
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided)=>(  
                          <li className='ltodo mt-2 d-flex justify-content-center' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                             <div> <p>{text}</p></div>
                          </li>
                          
                          )}
                          
                        </Draggable>
                      );
                      
                    })}
                       {provided.placeholder}
                  </ul>
                  )}
                </Droppable>
             

                </div>
          </div>
          <div className='cart col-md-3'>
            <div className='card-title'>
              <h3 className='ct d-flex justify-content-center' draggable={true}>Done</h3>
            </div>
            <div className='card-body'>

              <Droppable droppableId='done' >
                  {(provided) =>(
                  <ul className='done' {...provided.droppableProps} ref={provided.innerRef}>
                    {!cplist?<></>:cplist.map(({id,text},index)=>{
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided)=>(  
                          <li className='ltodo mt-2 d-flex justify-content-center' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                             <div> <p>{text}</p></div>
                          </li>
                          
                          )}
                          
                        </Draggable>
                      );
                      
                    })}
                       {provided.placeholder}
                  </ul>
                  )}
                </Droppable>
                </div>
          </div>
          </DragDropContext>
      </div>
   
   </>

  );
}

export default App;
