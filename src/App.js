import './App.css';
import Button from './components/Button'
import Subject from './components/Subject'
import Modal from './components/Modal'

function App() {
  return (
    <div className="App">
      <div id='modal-wrapper'>
        <Modal modalType='Add subject' />
      </div>
      <h1>Schedule Generator</h1>
      <div id='btn-wrapper'>
        <Button text='Add class' id='add-btn' type='btn' />
        <Button text='Edit class' id='edit-btn' type='btn' />
        <Button text='Delete class' id='del-btn' type='btn' />
      </div>
      <div id='days-wrapper'>
        <div id='mon' className='days'>
          <p>Monday</p>
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
        </div>
        <div id='tue' className='days'>
          <p>Tuesday</p>
        </div>
        <div id='wed' className='days'>
          <p>Wednesday</p>
        </div>
        <div id='thu' className='days'>
          <p>Thursday</p>
        </div>
        <div id='fri' className='days'>
          <p>Friday</p>
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
        <div id='sat' className='days'>
          <p>Saturday</p>
        </div>
        <div id='sun' className='days'>
          <p>Sunday</p>
        </div>
      </div>
    </div>
  );
}

export default App;
