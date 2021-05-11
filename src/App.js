import './App.css';
import Button from './components/Button'
import Subject from './components/Subject'
import Modal from './components/Modal'
import { useState, useEffect } from 'react'

function App() {
  const modalObject = {
    wrapperClasses: 'invisible',
    title: '',
    modalClasses: '',
    text: '',
    idOkBtn: ''
  }
  const schObj = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  }
  const [ modalConfig, setModalConfig ] = useState(modalObject)
  const [ schedule, setSchedule ] = useState(schObj)
  const [ update, setUpdate ] = useState(false)
  const [ canEdit, setEdit ] = useState(false)
  // const [ canDelete, setDelete ] = useState(false)

  const handleClick = e => {
    let btnObject = takeBtnParent(e, 'btn')
    if (btnObject.id === 'add-btn'){
      setModalConfig({
        wrapperClasses: 'add',
        title: 'Add task',
        modalClasses: 'add',
        text: 'Add',
        idOkBtn: 'modalAddBtn'
      })
      setEdit(false)
    }
    if (btnObject.id === 'edit-btn'){
      setEdit(!canEdit)
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
      setEdit(false)
      setModalConfig({...modalConfig, wrapperClasses: 'invisible'})
    }
  }

  const handleApproval = e => {
    let btnObject = takeBtnParent(e, 'btn')
    if (btnObject.id === 'modalAddBtn'){
      addTask()
    }
    if (btnObject.id === 'modalEditBtn'){
      console.log('hola');
      if (addTask()){
        setEdit(false)
      }
    }
    if (btnObject.id === 'modalDelBtn'){

    }
  }

  const removeLastKeyStored = () => {
    let wrapper = document.querySelector('#modal-wrapper-edit')
    let id = wrapper.classList.item(wrapper.classList.length - 1)
    localStorage.removeItem(id)
  }

  const takeBtnParent = (e, parent) => {
    let object = e.target
    while (!object.classList.contains(parent)){
      object = object.parentNode
    }
    return object
  } 

  const addTask = () => {
    let form = document.querySelector('.modal')
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
      if (canEdit){
        removeLastKeyStored()
      }
      clearModal(inputs)
      setUpdate(!update)
      setModalConfig({...modalConfig, wrapperClasses: 'invisible'})
      return true
    }
    else {
      console.log('Completion required');
      return false
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
    } else if (empty === 0){
      return true
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

  if (canEdit){
    let editBtn = document.querySelector('#edit-btn')
    console.log(editBtn);
    editBtn.classList.add('active')
    let events = document.querySelectorAll('.subj-wrapper')
    events.forEach(e => e.classList.add('editable'))
  }  else {
    setTimeout(() => {
      let editBtn = document.querySelector('#edit-btn')
      console.log(editBtn);
      editBtn.classList.remove('active')
    }, 0);
    let events = document.querySelectorAll('.subj-wrapper')
    events.forEach(e => e.classList.remove('editable'))
  }

  useEffect(() => {
    let obj = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
    for (let i=0; i < localStorage.length; i++){
      let item = JSON.parse(localStorage.getItem(localStorage.key(i)))
      let day = item.day
      obj[day][obj[day].length] = {
        id: localStorage.key(i),
        name: item.name,
        dsc: item.dsc,
        start: item.start,
        end: item.end,
        color: item.color
      }
    }
    // console.log(obj);
    setSchedule(obj)
    // console.log(schedule);
  }, [update])

  const handleEventClick = (e) => {
    let event = takeBtnParent(e, 'subj-wrapper')
    if (canEdit) {
      setModalConfig({
        wrapperClasses: 'edit',
        title: 'Edit task',
        modalClasses: `edit ${event.id}`,
        text: 'Edit',
        idOkBtn: 'modalEditBtn'
      })
      let data = JSON.parse(localStorage.getItem(event.id))
      document.querySelector('#evName').value = data.name
      document.querySelector('#evDsc').value = data.dsc
      document.querySelector('#evDay').value = data.day
      document.querySelector('#evStart').value = data.start
      document.querySelector('#evEnd').value = data.end
      document.querySelector('#evColor').value = data.color
    }
  }

  return (
    <div className="App">
      <div id='modal-wrapper' className={modalConfig.wrapperClasses}>
        <Modal modalType={modalConfig.title} modalClass={modalConfig.modalClasses} id={'modal-wrapper-' + modalConfig.wrapperClasses}
          handleClick={handleClick} text={modalConfig.text} handleApproval={handleApproval} idOkBtn={modalConfig.idOkBtn}
        />
      </div>
      <h1>Schedule Generator</h1>
      <div id='btn-wrapper'>
        <Button handleClick={handleClick} text='Add task' id='add-btn' 
          type='btn add' imgSrc='./img/plus.svg' imgAlt='Add' 
        />
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
            {schedule['Monday'].length > 0 ? 
                schedule['Monday'].map(e => 
                  <Subject
                    handleEventClick={handleEventClick} 
                    id={e.id}
                    color={e.color}
                    subject={e.name}
                    subjDsc={e.dsc}
                    timeStart={e.start}
                    timeEnd={e.end}
                  />
                ) : <></> 
            }
          </div>
        </div>
        <div id='tue' className='days'>
          <p>Tuesday</p>
          <div className='subj-container'>
            {schedule['Tuesday'].length > 0 ? 
              schedule['Tuesday'].map(e => 
                <Subject
                  handleEventClick={handleEventClick} 
                  id={e.id}
                  color={e.color}
                  subject={e.name}
                  subjDsc={e.dsc}
                  timeStart={e.start}
                  timeEnd={e.end}
                />
              ) : <></> 
            }
          </div>
        </div>
        <div id='wed' className='days'>
          <p>Wednesday</p>
          <div className='subj-container'>
            {schedule['Wednesday'].length > 0 ? 
              schedule['Wednesday'].map(e => 
                <Subject
                  handleEventClick={handleEventClick} 
                  id={e.id}
                  color={e.color}
                  subject={e.name}
                  subjDsc={e.dsc}
                  timeStart={e.start}
                  timeEnd={e.end}
                />
              ) : <></> 
            }
          </div>
        </div>
        <div id='thu' className='days'>
          <p>Thursday</p>
          <div className='subj-container'>
            {schedule['Thursday'].length > 0 ? 
              schedule['Thursday'].map(e => 
                <Subject
                  handleEventClick={handleEventClick} 
                  id={e.id}
                  color={e.color}
                  subject={e.name}
                  subjDsc={e.dsc}
                  timeStart={e.start}
                  timeEnd={e.end}
                />
              ) : <></> 
            }
          </div>
        </div>
        <div id='fri' className='days'>
          <p>Friday</p>
          <div className='subj-container'>
            {schedule['Friday'].length > 0 ? 
              schedule['Friday'].map(e => 
                <Subject
                  handleEventClick={handleEventClick} 
                  id={e.id}
                  color={e.color}
                  subject={e.name}
                  subjDsc={e.dsc}
                  timeStart={e.start}
                  timeEnd={e.end}
                />
              ) : <></> 
            }
          </div>
        </div>
        <div id='sat' className='days'>
          <p>Saturday</p>
          <div className='subj-container'>
            {schedule['Saturday'].length > 0 ? 
              schedule['Saturday'].map(e => 
                <Subject
                  handleEventClick={handleEventClick} 
                  id={e.id}
                  color={e.color}
                  subject={e.name}
                  subjDsc={e.dsc}
                  timeStart={e.start}
                  timeEnd={e.end}
                />
              ) : <></> 
            }
          </div>
        </div>
        <div id='sun' className='days'>
          <p>Sunday</p>
          <div className='subj-container'>
            {schedule['Sunday'].length > 0 ? 
              schedule['Sunday'].map(e => 
                <Subject
                  handleEventClick={handleEventClick} 
                  id={e.id}
                  color={e.color}
                  subject={e.name}
                  subjDsc={e.dsc}
                  timeStart={e.start}
                  timeEnd={e.end}
                />
              ) : <></> 
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
