import Button from './Button'

const Modal  = (props) => {
    return (
        <div id={props.id} className={'modal ' + props.modalClass}>
            <p>{props.modalType}</p>
            <div className='modal-form' id={props.idForm}>
                <label>Name
                    <input type='text' placeholder='Go shopping...' />
                </label>
                <label>Description 
                    <input type='text' placeholder='Meat, vegetables...' />
                </label>
                <label>Day
                    <input type='date' id='datePicker' />
                </label>
                <label>Start
                    <input type='time' />
                </label>
                <label>End
                    <input type='time'/>
                </label>
                <label>Color
                    <input type='color'/>
                </label>
                <div className='btn-modal-wrapper'>
                    <Button type='btn cancel' text='Cancel' handleClick={props.handleClick} />
                    <Button type='btn ok' text={props.text} />
                </div>
            </div>
        </div>
    )
}

export default Modal