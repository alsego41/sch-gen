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
                <label>Day
                    <select id='evDay'>
                        <option value='Monday'>Monday</option>
                        <option value='Tuesday'>Tuesday</option>
                        <option value='Wednesday'>Wednesday</option>
                        <option value='Thursday'>Thursday</option>
                        <option value='Friday'>Friday</option>
                        <option value='Saturday'>Saturday</option>
                        <option value='Sunday'>Sunday</option>
                    </select>
                </label>
                <label>Days
                    <div className='radio-button-wrapper radio-button-wrapper__day'>
                        <RadioButton text='M' classRadio='radio-button radio-button__days' />
                        <RadioButton text='Tu' classRadio='radio-button radio-button__days' />
                        <RadioButton text='W' classRadio='radio-button radio-button__days' />
                        <RadioButton text='Th' classRadio='radio-button radio-button__days radio-button__days__active' />
                        <RadioButton text='F' classRadio='radio-button radio-button__days' />
                        <RadioButton text='Sa' classRadio='radio-button radio-button__days' />
                        <RadioButton text='Su' classRadio='radio-button radio-button__days radio-button__days__active' />
                    </div>
                </label>
                <label>Start
                    <input type='time' required id='evStart'/>
                </label>
                <label>End
                    <input type='time' required id='evEnd' />
                </label>
                <label>Color
                    <input type='color' id='evColor' />
                </label>
                <label>Colors
                    <div className='radio-button-wrapper radio-button-wrapper__day'>
                        <RadioButton color='rgb(255, 30, 0)' classRadio='radio-button radio-button__color' />
                        <RadioButton color='rgb(255, 184, 53)' classRadio='radio-button radio-button__color' />
                        <RadioButton color='rgb(252, 248, 33)' classRadio='radio-button radio-button__color' />
                        <RadioButton color='rgb(33, 252, 150)' classRadio='radio-button radio-button__color radio-button__color__active' />
                        <RadioButton color='rgb(33, 237, 252)' classRadio='radio-button radio-button__color' />
                        <RadioButton color='rgb(33, 121, 252)' classRadio='radio-button radio-button__color' />
                        <RadioButton color='rgb(153, 33, 252)' classRadio='radio-button radio-button__color radio-button__color__active' />
                    </div>
                </label>
                <div className='btn-modal-wrapper'>
                    <Button type='btn cancel' text='Cancel' handleClick={props.closeModal} />
                    <Button type='btn ok' text={props.text} handleClick={props.handleApproval} id={props.idOkBtn} />
                </div>
            </div>
        </div>
    )
}

export default Modal