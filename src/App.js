import './App.css';
import Button from './components/Button'
import Subject from './components/Subject'
import Modal from './components/Modal'
import { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

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
  const [ minMaxTimes, setMinMaxTimes ] = useState(['00:00','23:55',0])

  const version = '1.0'
  const desktopGridHeight = '80px'

  // Handle main button clicks
  const handleClick = e => {
    let btnObject = takeBtnParent(e, 'btn')
    if (btnObject.id === 'add-btn'){
      setAlertAdd(false)
      showModal({
        wrapperClasses: 'add',
        title: 'Add task',
        modalClasses: 'add',
        text: 'Add',
        idOkBtn: 'modalAddBtn'
      })
      clearModal()
      setEdit(false)
      setDelete(false)
    }
    if (btnObject.id === 'edit-btn'){
      setEdit(!canEdit)
      setDelete(false)
      setAlertAdd(false)
    }
    if (btnObject.id === 'del-btn'){
      setAlertAdd(false)
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
    }
    if (btnObject.id === 'modalEditBtn'){
      if (addTask()){
        setEdit(false)
      }
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
      clearModal()
      setUpdate(!update)
      setModalConfig({...modalConfig, wrapperClasses: 'invisible'})
      closeModal()
      return true
    }
    else {
      setAlertAdd(true)
      return false
    }
  }

  // Check Completion of modal form
  const checkCompletion = task => {
    let values = Object.values(task)
    let empty = values.filter(value => value === '' && typeof value === 'string').length
    let times = []
    times.push(task.start)
    times.push(task.end)
    times = times.map(time => time.replace(':',''))
    if (times[0] > times[1]) return false
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
    let inputs = modalInputs()
    inputs[2] = Array.from(inputs[2]).filter(i => i.classList.contains('radio-button__days__active'))
    let days = inputs[2].map(i => i.innerText)
    let color = Array.from(inputs[5]).filter(i => i.classList.contains('radio-button__color__active'))[0]
    color = color ?? inputs[5][4]
    let data = {
      name: inputs[0].value,
      dsc: inputs[1].value,
      days: arrToDay(days, 'atd'),
      start: inputs[3].value,
      end: inputs[4].value,
      color: color.style.backgroundColor,
      version
    }
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

  // Empty the modal and remove readonly attrs
  const clearModal = () => {
    let inputs = modalInputs()
    inputs.forEach(i => {
      if (i.tagName === 'INPUT'){
        i.value = ''
        i.removeAttribute('readonly')
      }
    })
    inputs[2].forEach(i => {
      i.classList.remove('unclickable')
      i.classList.remove('radio-button__days__active')
    })
    inputs[5].forEach(i => {
      i.classList.remove('unclickable')
      i.classList.remove('radio-button__color__active')
    })
  }
  
  // Set events, editbtn and delbtn to have a SPECIAL CLASS (HIGHLIGHTS EVs) in edit
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

  // Convert days object to array and viceversa
  const arrToDay = (arr, way) => {
    let abv = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let newArr = []
    if (way === 'atd'){
      newArr = arr.map(d => days[abv.findIndex(sAbv => sAbv === d)])
    }
    if (way === 'dta')
      newArr = arr.map(d => abv[days.findIndex(day => day === d)])
    return newArr
  }

  const removeUnusableData = () => {
    for (let i = 0; i < localStorage.length; i++){
      let keyD = JSON.parse(localStorage.getItem(localStorage.key(i)))
      if (!('version' in keyD) || keyD.version !== version) {
        localStorage.removeItem(localStorage.key(i))
      }
    }
  }

  const sortByTime = (dayTasks) => {
    Object.keys(dayTasks).forEach(day => {
      let dayAux = []
      if (dayTasks[day].length > 1){
        dayTasks[day].forEach(ev => {
          ev.start = ev.start.replace(':','')
          dayAux.push(ev);
        })
        dayAux.sort((a,b) => {
          return a.start - b.start
        })
        dayAux.forEach(day => {
          let aux = day.start.slice(2)
          day.start = day.start.slice(0,2).concat(':',aux)
        })
        dayTasks[day] = dayAux
      }
    })
  }

  // Update schedule state with localStorage data
  useEffect(() => {
    removeUnusableData()
    let obj = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
    // Need for a 'priority' sorting, altho more like sorted by start time
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
    }
    sortByTime(obj)
    setSchedule(obj)
    getMinMaxSchTime()
  }, [update])

  // Click on highlighted events to edit/delete
  const handleEventClick = (e) => {
    let event = takeBtnParent(e, 'subj-wrapper')
    if (canEdit || canDelete) {
      let data = JSON.parse(localStorage.getItem(event.dataset.key))
      clearModal()
      fillModal(data)
      if (canEdit){
        showModal({
          wrapperClasses: 'edit',
          title: 'Edit task',
          modalClasses: `edit ${event.dataset.key}`,
          text: 'Edit',
          idOkBtn: 'modalEditBtn'
        })
      }
      else if (canDelete) {
        showModal({
          wrapperClasses: 'del',
          title: 'Delete task',
          modalClasses: `del ${event.dataset.key}`,
          text: 'Delete',
          idOkBtn: 'modalDelBtn'
        })
        lockModalData()
      } 
    }
  }

  // Fill modal inputs with data recieved
  const fillModal = (data) => {
    let inputs = modalInputs()
    let days = arrToDay(data.days, 'dta')
    inputs[0].value = data.name
    inputs[1].value = data.dsc
    days.forEach((day)=> {
      Array.from(inputs[2]).find(i => i.innerText === day).classList.add('radio-button__days__active')
    })
    inputs[3].value = data.start
    inputs[4].value = data.end
    Array.from(inputs[5]).find(i => i.style.backgroundColor === data.color).classList.add('radio-button__color__active')
  }

  // Lock all inputs in modal, so user can't interact with them
  const lockModalData = () => {
    let inputs = modalInputs()
    inputs.forEach(i => {
      if (i.tagName === 'INPUT') {
        i.setAttribute('readonly', true)
      }
    })
    inputs[2].forEach(i => i.classList.add('unclickable'))
    inputs[5].forEach(i => i.classList.add('unclickable'))
  }

  // Modal day buttons interactions
  const dayBtnClick = e => {
    let btn = takeBtnParent(e, 'radio-button')
    btn.classList.toggle('radio-button__days__active')
  }

  // Modal color buttons interactions
  const colorBtnClick = e => {
    let btn = e.target
    let colorsBtns = document.querySelectorAll('.radio-button__color')
    colorsBtns.forEach(cBtn => 
      cBtn.classList.remove('radio-button__color__active')
    )
    btn.classList.toggle('radio-button__color__active')
  }

  const adjustEndTime = e => {
    let endTimeInput = document.querySelector('#evEnd')
    endTimeInput.setAttribute('min', e.target.value)
  }

  useEffect(() => {
    assignGridTemplate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minMaxTimes])

  const assignGridTemplate = () => {
    let count = minMaxTimes[2]
    let schContainer = document.querySelectorAll('.subj-container')
    let schWrapper = document.querySelectorAll('.subj-wrapper')
    let medQuery = window.matchMedia('(max-width: 1365px)')

    if (!medQuery.matches){
      schContainer.forEach(sch => {
        sch.classList.add('new-grid')
        sch.style.gridTemplateRows = `repeat(${count}, ${desktopGridHeight})`
      })
      placeGridItems()
    }

    medQuery.addEventListener('change', e => {
      if (e.matches){
        schContainer.forEach(sch => {
          sch.removeAttribute('style')
        })
        schWrapper.forEach(sch => {
          sch.style.gridRow = 'auto'
          sch.style.gridColumn = 'auto'
        })
      }
      if (!e.matches){
        schContainer.forEach(sch => {
          sch.classList.add('new-grid')
          sch.style.gridTemplateRows = `repeat(${count + 1}, ${desktopGridHeight})`
        })
        placeGridItems()
      }
    })
  }

  const getMinMaxSchTime = () => {
    if (localStorage.length > 0){
      let startTimes = []
      let endTimes = []
      for (let i = 0; i < localStorage.length; i++){
        let key = JSON.parse(localStorage.getItem(localStorage.key(i)))
        startTimes.push(key.start)
        endTimes.push(key.end)
      }
      startTimes = startTimes.map(time => {
        return time.replace(':','')
      })
      endTimes = endTimes.map(time => {
        return time.replace(':','')
      })
      let start = Math.floor(Math.min(...startTimes) / 100)
      let end = Math.ceil(Math.max(...endTimes) / 100)
      setMinMaxTimes([start, end, end - start])
    }
  }

  const placeGridItems = ( ) => {
    let min = minMaxTimes[0] - 1
    let values = Object.values(schedule)
    values.forEach(day => {
      if (day.length > 0){
      day.forEach(event => {
        let start = convertHourToNumber(event.start, 'floor')
        let end = convertHourToNumber(event.end, 'ceil')
        let tasks = document.querySelectorAll(`[data-key=${event.id}]`)
        tasks.forEach(task => {
          task.style.gridRow = `${start-min}/${end-min}`
          task.style.gridColumn = '1/2'
          if (window.getComputedStyle(task).height === desktopGridHeight){
            task.classList.add('remove-dsc')
          }
          if (window.getComputedStyle(task).height !== desktopGridHeight)
            task.classList.remove('remove-dsc')
        })
      })}
    })
  }

  const convertHourToNumber = (hour, roundTo) => {
    if (roundTo === 'floor') return Math.floor(hour.replace(':','') / 100)
    if (roundTo === 'ceil') return Math.ceil(hour.replace(':','') / 100)
  }

  const exportSchedule = () => {
    const doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts:true,
      floatPrecision: 'smart'
    })
    let expSch = document.querySelector('#days-wrapper')
    let tasks = document.querySelectorAll('.subj-wrapper')
    tasks.forEach(task => {
      task.classList.add('toPrint')
    })
    
    html2canvas(expSch, {
      scale: 2,
      scrollY: -window.scrollY, 
      scrollX: -window.scrollX
    }).then(canvas => {
      let width = Math.floor(Number(window.getComputedStyle(expSch).width.slice(0,-2)) * 0.264583)
      let height = Math.floor(Number(window.getComputedStyle(expSch).height.slice(0,-2)) * 0.264583)
      const img = canvas.toDataURL('image/JPEG', 1);
      doc.internal.pageSize.setWidth(width);
      doc.internal.pageSize.setHeight(height);
      doc.addImage(img, 'JPEG', -1, 0, width, height, undefined, 'FAST');
      return doc
    }
    ).then((docr) => {
      docr.save('schedule.pdf');
      tasks.forEach(task => {
        task.classList.remove('toPrint')
      })
    })
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
            {[...Array(minMaxTimes[2]).keys()].map((i) => {
              return (
                <p className='hours' key={`hour-${i}`}>
                  {minMaxTimes[0] + i}
                </p>
              )
            })}
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
          <div id='wed' className='days'>
            <p>Wednesday</p>
            <div className='subj-container'>
              {schedule['Wednesday'].length > 0 ? 
                schedule['Wednesday'].map(e => 
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
          <div id='thu' className='days'>
            <p>Thursday</p>
            <div className='subj-container'>
              {schedule['Thursday'].length > 0 ? 
                schedule['Thursday'].map(e => 
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
          <div id='fri' className='days'>
            <p>Friday</p>
            <div className='subj-container'>
              {schedule['Friday'].length > 0 ? 
                schedule['Friday'].map(e => 
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
          <div id='sat' className='days'>
            <p>Saturday</p>
            <div className='subj-container'>
              {schedule['Saturday'].length > 0 ? 
                schedule['Saturday'].map(e => 
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
          <div id='sun' className='days'>
            <p>Sunday</p>
            <div className='subj-container'>
              {schedule['Sunday'].length > 0 ? 
                schedule['Sunday'].map(e => 
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
        </div>
        <div className='download-btn btn' onClick={exportSchedule}>
          <p>Download</p>
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
          incomplete={alertAdd}
          adjustEndTime={adjustEndTime}
        />
      </div>
    </>
  );
}

export default App;
