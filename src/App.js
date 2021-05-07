import './App.css';
import Button from './components/Button'
import Subject from './components/Subject'
import Modal from './components/Modal'
import { useState } from 'react'

const takeBtnParent = e => {
  let object = e.target
  while (!object.classList.contains('btn')){
    object = object.parentNode
  }
  // console.log(object);
  return object
} 

function App() {
  const modalObject = {
    wrapperClasses: 'invisible',
    title: '',
    modalClasses: '',
    text: ''
  }
  const [ modalConfig, setModalConfig ] = useState(modalObject)

  const handleClick = e => {
    let btnObject = takeBtnParent(e)
    // console.log(btnObject);
    // console.log(btnObject.id);
    if (btnObject.id === 'add-btn'){
      document.querySelector('#datePicker').valueAsDate = new Date()
      setModalConfig({
        wrapperClasses: 'add',
        title: 'Add task',
        modalClasses: 'add',
        text: 'Add'
      })
    }
    if (btnObject.id === 'edit-btn'){
      document.querySelector('#datePicker').valueAsDate = new Date()
      setModalConfig({
        wrapperClasses: 'edit',
        title: 'Edit task',
        modalClasses: 'edit',
        text: 'Edit'
      })
    }
    if (btnObject.id === 'del-btn'){
      document.querySelector('#datePicker').valueAsDate = new Date()
      setModalConfig({
        wrapperClasses: 'del',
        title: 'Delete task',
        modalClasses: 'del',
        text: 'Delete'
      })
    }
    if (btnObject.classList.contains('cancel')){
      // console.log('cancel');
      setModalConfig({...modalConfig, wrapperClasses: 'invisible'})
    }
    // console.log();
  }

  // console.log(new Date());


  return (
    <div className="App">
      <div id='modal-wrapper' className={modalConfig.wrapperClasses}>
        <Modal modalType={modalConfig.title} modalClass={modalConfig.modalClasses} handleClick={handleClick} text={modalConfig.text} />
      </div>
      <h1>Schedule Generator</h1>
      <div id='btn-wrapper'>
        <Button handleClick={handleClick} text='Add task' id='add-btn' type='btn add' imgSrc='./img/plus.svg' imgAlt='Add' />
        <Button handleClick={handleClick} text='Edit task' id='edit-btn' type='btn edit' imgSrc='./img/pencil-fill.svg' imgAlt='Edit' />
        <Button handleClick={handleClick} text='Delete task' id='del-btn' type='btn del' imgSrc='./img/trash-fill.svg' imgAlt='Delete' />
      </div>
      <div id='days-wrapper'>
        <div className='days' id='sch-hours'>
          <p>Hours</p>
        </div>
        <div id='mon' className='days'>
          <p>Monday</p>
          <div className='subj-container'>
            <Subject 
              id='md'
              color='#D1DF71'
              subject='Matematica Discreta'
              subjType='Práctica'
              professor='Sabatinelli'
              classroom='303'
              commission='3K3'
              timeStart='07:00'
              timeEnd='10:00'
            />
            <Subject 
              id='alg'
              color='#2DC3DB'
              subject='Álgebra'
              subjType='Práctica'
              professor='Sabatinelli'
              classroom='303'
              commission='3K3'
              timeStart='10:00'
              timeEnd='12:00'
            />
            <Subject 
              id='ayed'
              color='#2DC3DB'
              subject='Algoritmos y Estructuras de Datos'
              subjType='Práctica'
              professor='Pérez'
              classroom='303'
              commission='3K3'
              timeStart='12:00'
              timeEnd='13:30'
            />
          </div>
        </div>
        <div id='tue' className='days'>
          <p>Tuesday</p>
          <div className='subj-container'></div>
        </div>
        <div id='wed' className='days'>
          <p>Wednesday</p>
          <div className='subj-container'>
            <Subject 
                id='ayeds'
                color='#20CF0B'
                subject='Algoritmos y Estructuras de Datos'
                subjType='Práctica'
                professor='Pérez'
                classroom='303'
                commission='3K3'
                timeStart='12:00'
                timeEnd='13:30'
              />
          </div>
        </div>
        <div id='thu' className='days'>
          <p>Thursday</p>
          <div className='subj-container'></div>
        </div>
        <div id='fri' className='days'>
          <p>Friday</p>
          <div className='subj-container'>
            <Subject 
              id='amii'
              color='#DF717C'
              subject='Análisis Matemático'
              subjType='Práctica'
              professor='Sabatinelli'
              classroom='303'
              commission='3K3'
              timeStart='10:00'
              timeEnd='12:00'
            />
          </div>
        </div>
        <div id='sat' className='days'>
          <p>Saturday</p>
          <div className='subj-container'></div>
        </div>
        <div id='sun' className='days'>
          <p>Sunday</p>
          <div className='subj-container'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
