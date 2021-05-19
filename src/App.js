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
  const [ canDelete, setDelete ] = useState(false)
  const [ alertAdd, setAlertAdd ] = useState(false)

  // Handle main button clicks
  const handleClick = e => {
    let btnObject = takeBtnParent(e, 'btn')
    if (btnObject.id === 'add-btn'){
      showModal({
        wrapperClasses: 'add',
        title: 'Add task',
        modalClasses: 'add',
        text: 'Add',
        idOkBtn: 'modalAddBtn'
      })
      clearModal(true)
      setEdit(false)
      setDelete(false)
    }
    if (btnObject.id === 'edit-btn'){
      setEdit(!canEdit)
      setDelete(false)
    }
    if (btnObject.id === 'del-btn'){
      setDelete(!canDelete)
      setEdit(false)
    }
  }

  // Activate modal
  const showModal = (props) => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    setModalConfig(props)
  }

  // De-activate modal
  const closeModal = () => {
    const scrollY = Number(document.body.style.top.slice(1, -2))
    document.body.style.position = ''
    document.body.style.top = ''
    window.scrollTo(0, scrollY)
    setModalConfig({...modalConfig, wrapperClasses: 'invisible'})
    setEdit(false)
    setDelete(false)
  }

  // Handle modal approval buttons
  const handleApproval = e => {
    let btnObject = takeBtnParent(e, 'btn')
    if (btnObject.id === 'modalAddBtn'){
      addTask()
      if (alertAdd) closeModal()
    }
    if (btnObject.id === 'modalEditBtn'){
      if (addTask()){
        setEdit(false)
      }
      closeModal()
    }
    if (btnObject.id === 'modalDelBtn'){
      removeLastKeyStored('del')
      setDelete(false)
      setUpdate(!update)
      closeModal()
    }
  }

  // Remove localStorage key of an event being edited, so the edited is re-created.
  const removeLastKeyStored = (type) => {
    let wrapper = document.querySelector(`#modal-wrapper-${type}`)
    let id = wrapper.classList.item(wrapper.classList.length - 1)
    localStorage.removeItem(id)
  }

  // Return a given 'main' parent of a clicked element.
  const takeBtnParent = (e, parent) => {
    let object = e.target
    while (!object.classList.contains(parent)){
      object = object.parentNode
    }
    return object
  } 

  // Retrieve data from modal form and call other functions to store and show it.
  const addTask = () => {
    let task = getDataFromModal()
    if (checkCompletion(task)){
      setAlertAdd(false)
      storeTask(task)
      if (canEdit){
        removeLastKeyStored('edit')
      }
      clearModal(true)
      setUpdate(!update)
      setModalConfig({...modalConfig, wrapperClasses: 'invisible'})
      return true
    }
    else {
      setAlertAdd(true)
      console.log('Completion required');
      return false
    }
  }

  // Check Completion of modal form
  const checkCompletion = task => {
    let values = Object.values(task)
    let empty = values.filter(value => value === '' && typeof value === 'string').length
    if (task.days.length === 0) ++empty 
    if (empty === 0) return true
    if (empty > 1) return false
    if (empty === 1){
      if (task.dsc === '') return true
      else return false
    }
  }

  // Store an event in localStorage
  const storeTask = task => {
    localStorage.setItem(createToken(), JSON.stringify(task))
  }

  // Create a 'token' id for each event key
  const createToken = () => {
    let token = ''
    for (let i=0; i<10; i++){
      token = token.concat(String.fromCharCode(Math.floor(Math.random() * 25) + 97))
    }
    return token
  }

  const getDataFromModal = () => {
    // let dBtns = document.querySelectorAll('.radio-button__days__active')
    // let days = []
    // dBtns.forEach(dB => days.push(dB.innerText));
    // let color = document.querySelector('.radio-button__color__active')
    // // console.log(days);
    // let data2 = {
    //   name: document.querySelector('#evName').value,
    //   dsc: document.querySelector('#evDsc').value,
    //   start: document.querySelector('#evStart').value,
    //   end: document.querySelector('#evEnd').value,
    //   color: color.style.backgroundColor,
    //   day: document.querySelector('#evDay').value
    // }

    let inputs = modalInputs()
    inputs[2] = Array.from(inputs[2]).filter(i => i.classList.contains('radio-button__days__active'))
    let days = inputs[2].map(i => i.innerText)
    inputs[5] = Array.from(inputs[5]).filter(i => i.classList.contains('radio-button__color__active'))[0]
    // console.log(inputs);

    let data = {
      name: inputs[0].value,
      dsc: inputs[1].value,
      days: arrToDay(days),
      start: inputs[3].value,
      end: inputs[4].value,
      color: inputs[5].style.backgroundColor,
    }
    console.log(data);

    // console.log(arrToDay(data.days));
    return data
  }

  const modalInputs = () => {
    let inputs = []
    inputs.push(document.querySelector('#evName'))
    inputs.push(document.querySelector('#evDsc'))
    inputs.push(document.querySelectorAll('.radio-button__days'))
    inputs.push(document.querySelector('#evStart'))
    inputs.push(document.querySelector('#evEnd'))
    inputs.push(document.querySelectorAll('.radio-button__color'))
    return inputs
  }

  // console.log(modalInputs());

  // Empty the modal and remove readonly attrs
  const clearModal = (remove) => {
    let inputs = modalInputs()
    inputs.forEach(i => {
      if (i.tagName === 'INPUT'){
        i.value = ''
        i.removeAttribute('readonly')
      }
    })
    inputs[2].forEach(i => {
      i.classList.remove('unclickeable')
      i.classList.remove('radio-button__days__active')
    })
    inputs[5].forEach(i => i.classList.remove('unclickeable'))
    }
  
  // Set events, editbtn and delbtn to have a special class in edit
  if (canEdit || canDelete){
    let events = document.querySelectorAll('.subj-wrapper')
    events.forEach(e => e.classList.add('active'))
    if (canEdit){
      let editBtn = document.querySelector('#edit-btn')
      editBtn.classList.add('active')
      let delBtn = document.querySelector('#del-btn')
      delBtn.classList.remove('active')
    }
    else if (canDelete){
      let delBtn = document.querySelector('#del-btn')
      delBtn.classList.add('active')
      let editBtn = document.querySelector('#edit-btn')
      editBtn.classList.remove('active')
    }
  }  else {
    setTimeout(() => {
      if (!canEdit){
        let editBtn = document.querySelector('#edit-btn')
        editBtn.classList.remove('active')
      }
      if (!canDelete){
        let delBtn = document.querySelector('#del-btn')
        delBtn.classList.remove('active')
      }
    }, 0);
    let events = document.querySelectorAll('.subj-wrapper')
    events.forEach(e => e.classList.remove('active'))
  }

  const arrToDay = (arr) => {
    let abv = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let newArr = arr.map(d => days[abv.findIndex(sAbv => sAbv === d)])
    return newArr
  }

  // Update schedule with localStorage
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
      item.days.forEach((day)=> {
        obj[day][obj[day].length] = {
          id: localStorage.key(i),
          name: item.name,
          dsc: item.dsc,
          start: item.start,
          end: item.end,
          color: item.color
        }
      })
      // let day = item.day
      // obj[day][obj[day].length] = {
      //   id: localStorage.key(i),
      //   name: item.name,
      //   dsc: item.dsc,
      //   start: item.start,
      //   end: item.end,
      //   color: item.color
      // }
    }
    setSchedule(obj)
  }, [update])

  // Click on highlighted events to edit/delete
  const handleEventClick = (e) => {
    let event = takeBtnParent(e, 'subj-wrapper')
    if (canEdit || canDelete) {
      let data = JSON.parse(localStorage.getItem(event.id))
      clearModal(true)
      document.querySelector('#evName').value = data.name
      document.querySelector('#evDsc').value = data.dsc
      document.querySelector('#evDay').value = data.day
      document.querySelector('#evStart').value = data.start
      document.querySelector('#evEnd').value = data.end
      document.querySelector('#evColor').value = data.color
      if (canEdit){
        showModal({
          wrapperClasses: 'edit',
          title: 'Edit task',
          modalClasses: `edit ${event.id}`,
          text: 'Edit',
          idOkBtn: 'modalEditBtn'
        })
      }
      else if (canDelete) {
        showModal({
          wrapperClasses: 'del',
          title: 'Delete task',
          modalClasses: `del ${event.id}`,
          text: 'Delete',
          idOkBtn: 'modalDelBtn'
        })
        document.querySelector('#evName').setAttribute('readonly', true)
        document.querySelector('#evDsc').setAttribute('readonly', true)
        document.querySelector('#evDay').setAttribute('disabled', true)
        document.querySelector('#evStart').setAttribute('readonly', true)
        document.querySelector('#evEnd').setAttribute('readonly', true)
        document.querySelector('#evColor').setAttribute('disabled', true)
      } 
    }
  }

  // Modal day buttons
  const dayBtnClick = e => {
    let btn = takeBtnParent(e, 'radio-button')
    btn.classList.toggle('radio-button__days__active')
  }

  // Modal color buttons
  const colorBtnClick = e => {
    let btn = e.target
    let colorsBtns = document.querySelectorAll('.radio-button__color')
    colorsBtns.forEach(cBtn => 
      cBtn.classList.remove('radio-button__color__active')
    )
    btn.classList.toggle('radio-button__color__active')
  }

  return (
    <>
      <div className="App">       
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
                      name={e.id}
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
      <div 
        id='modal-wrapper' 
        className={modalConfig.wrapperClasses}>
        <Modal 
          modalType={modalConfig.title} 
          modalClass={modalConfig.modalClasses} 
          id={'modal-wrapper-' + modalConfig.wrapperClasses}
          idOkBtn={modalConfig.idOkBtn}
          text={modalConfig.text} 
          handleClick={handleClick} 
          handleApproval={handleApproval} 
          closeModal={closeModal}
          dayBtnClick={dayBtnClick}
          colorBtnClick={colorBtnClick}
        />
      </div>
    </>
  );
}

export default App;
