import './App.css';
import Button from './components/Button'
import Subject from './components/Subject'
import Modal from './components/Modal'
import { useState } from 'react'

function App() {
  const modalObject = {
    wrapperClasses: 'invisible',
    title: '',
    modalClasses: '',
    text: '',
    idOkBtn: ''
  }
  const [ modalConfig, setModalConfig ] = useState(modalObject)

  const handleClick = e => {
    let btnObject = takeBtnParent(e)
    if (btnObject.id === 'add-btn'){
      setModalConfig({
        wrapperClasses: 'add',
        title: 'Add task',
        modalClasses: 'add',
        text: 'Add',
        idOkBtn: 'modalAddBtn'
      })
    }
    if (btnObject.id === 'edit-btn'){
      setModalConfig({
        wrapperClasses: 'edit',
        title: 'Edit task',
        modalClasses: 'edit',
        text: 'Edit',
        idOkBtn: 'modalEditBtn'
      })
    }
    if (btnObject.id === 'del-btn'){
      setModalConfig({
        wrapperClasses: 'del',
        title: 'Delete task',
        modalClasses: 'del',
        text: 'Delete',
        idOkBtn: 'modalDelBtn'
      })
    }
    if (btnObject.classList.contains('cancel')){
      setModalConfig({...modalConfig, wrapperClasses: 'invisible'})
    }
  }

  const handleApproval = e => {
    let btnObject = takeBtnParent(e)
    if (btnObject.id === 'modalAddBtn'){
      addTask()
    }
    if (btnObject.id === 'modalEditBtn'){

    }
    if (btnObject.id === 'modalDelBtn'){

    }
  }

  const takeBtnParent = e => {
    let object = e.target
    while (!object.classList.contains('btn')){
      object = object.parentNode
    }
    return object
  } 

  const addTask = () => {
    let form = document.querySelector('#modal-wrapper-add')
    let inputs = form.querySelectorAll('input')
    let select = form.querySelectorAll('select')
    let task = {
      name: inputs[0].value,
      dsc: inputs[1].value,
      start: inputs[2].value,
      end: inputs[3].value,
      color: inputs[4].value,
      day: select[0].value,
    }
    if (checkCompletion(task)){
      storeTask(task)
      clearModal(inputs)
    }
    else {
      console.log('Completion required');
    }
  }

  const checkCompletion = task => {
    let values = Object.values(task)
    let empty = values.filter(input => input === '').length
    if (empty === 1){
      if (task.dsc === ''){
        return true
      }
      else {
        return false
      }
    } 
    else if (empty > 1) {
      return false
    }
  }

  const storeTask = task => {
    // createToken()
    localStorage.setItem(createToken(), JSON.stringify(task))
  }

  const createToken = () => {
    let token = ''
    for (let i=0; i<10; i++){
      token = token.concat(String.fromCharCode(Math.floor(Math.random() * 25) + 97))
    }
    return token
  }

  const clearModal = (inp) => {
    inp.forEach(i => i.value = '')
  }

  const displayEvents = () => {
    // retrieveEvent()
    console.log('s');
  }

  const retrieveEvent = () => {
    for (let i=0; i < localStorage.length; i++){
      console.log(localStorage.key(i));
      console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }
  retrieveEvent()

  return (
    <div className="App">
      <div id='modal-wrapper' className={modalConfig.wrapperClasses}>
        <Modal modalType={modalConfig.title} modalClass={modalConfig.modalClasses} id={'modal-wrapper-' + modalConfig.wrapperClasses}
          handleClick={handleClick} text={modalConfig.text} handleApproval={handleApproval} idOkBtn={modalConfig.idOkBtn}
        />
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
