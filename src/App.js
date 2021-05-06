import './App.css';
import Button from './components/Button'
import Subject from './components/Subject'
import Modal from './components/Modal'

function App() {
  return (
    <div className="App">
      <div id='modal-wrapper' className='add invisible'>
        <Modal modalType='Add subject' modalClass='add' />
      </div>
      <h1>Schedule Generator</h1>
      <div id='btn-wrapper'>
        <Button text='Add class' id='add-btn' type='btn add' imgSrc='./img/plus.svg' imgAlt='Add' />
        <Button text='Edit class' id='edit-btn' type='btn edit' imgSrc='./img/pencil-fill.svg' imgAlt='Edit' />
        <Button text='Delete class' id='del-btn' type='btn del' imgSrc='./img/trash-fill.svg' imgAlt='Delete' />
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
