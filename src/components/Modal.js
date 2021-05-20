import Button from './Button'
import RadioButton from './RadioButton'

const Modal  = (props) => {
    return (
        <div id={props.id} className={'modal ' + props.modalClass}>
            <p className='modal-title'>{props.modalType}</p>
            <div className='modal-form' id={props.idForm}>
                <label>Name
                    <input type='text' placeholder='Workout...' required id='evName' />
                </label>
                <label>Description 
                    <input type='text' placeholder='Lift...' id='evDsc' />
                </label>
                <label>Days
                    <div className='radio-button-wrapper radio-button-wrapper__day'>
                        <RadioButton text='M' classRadio='radio-button radio-button__days' radioBtnClick={props.dayBtnClick} />
                        <RadioButton text='Tu' classRadio='radio-button radio-button__days' radioBtnClick={props.dayBtnClick} />
                        <RadioButton text='W' classRadio='radio-button radio-button__days radio-button__days__active' radioBtnClick={props.dayBtnClick} />
                        <RadioButton text='Th' classRadio='radio-button radio-button__days' radioBtnClick={props.dayBtnClick} />
                        <RadioButton text='F' classRadio='radio-button radio-button__days' radioBtnClick={props.dayBtnClick} />
                        <RadioButton text='Sa' classRadio='radio-button radio-button__days' radioBtnClick={props.dayBtnClick} />
                        <RadioButton text='Su' classRadio='radio-button radio-button__days' radioBtnClick={props.dayBtnClick} />
                    </div>
                </label>
                <label>Start
                    <input type='time' required id='evStart'/>
                </label>
                <label>End
                    <input type='time' required id='evEnd' />
                </label>
                <label>Color
                    <div className='radio-button-wrapper radio-button-wrapper__day'>
                        <RadioButton color='rgb(255, 87, 87)' classRadio='radio-button radio-button__color' radioBtnClick={props.colorBtnClick} />
                        <RadioButton color='rgb(255, 184, 53)' classRadio='radio-button radio-button__color' radioBtnClick={props.colorBtnClick} />
                        <RadioButton color='rgb(252, 248, 33)' classRadio='radio-button radio-button__color' radioBtnClick={props.colorBtnClick} />
                        <RadioButton color='rgb(33, 252, 150)' classRadio='radio-button radio-button__color radio-button__color__active' radioBtnClick={props.colorBtnClick} />
                        <RadioButton color='rgb(33, 237, 252)' classRadio='radio-button radio-button__color' radioBtnClick={props.colorBtnClick} />
                        <RadioButton color='rgb(169, 186, 199)' classRadio='radio-button radio-button__color' radioBtnClick={props.colorBtnClick} />
                        <RadioButton color='rgb(255, 122, 206)' classRadio='radio-button radio-button__color' radioBtnClick={props.colorBtnClick} />
                    </div>
                </label>
                <div className={props.incomplete ? 'alert' : 'invisible'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                    </svg>
                    <p >One or more fields are incomplete.</p>
                </div>
                <div className='btn-modal-wrapper'>
                    <Button type='btn cancel' text='Cancel' handleClick={props.closeModal} />
                    <Button type='btn ok' text={props.text} handleClick={props.handleApproval} id={props.idOkBtn} />
                </div>
            </div>
        </div>
    )
}

export default Modal