import Button from './Button'

const Modal  = (props) => {
    return (
        <div id={props.id} className={'modal ' + props.modalClass}>
            <p>{props.modalType}</p>
            <div className='modal-form' id={props.idForm}>
                <label>Name
                    <input type='text' placeholder='Workout...' required />
                </label>
                <label>Description 
                    <input type='text' placeholder='Lift...' />
                </label>
                <label>Day
                    <select>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                    </select>
                </label>
                <label>Start
                    <input type='time' required/>
                </label>
                <label>End
                    <input type='time' required/>
                </label>
                <label>Color
                    <input type='color'/>
                </label>
                <div className='btn-modal-wrapper'>
                    <Button type='btn cancel' text='Cancel' handleClick={props.handleClick} />
                    <Button type='btn ok' text={props.text} handleClick={props.handleApproval} id={props.idOkBtn} />
                </div>
            </div>
        </div>
    )
}

export default Modal