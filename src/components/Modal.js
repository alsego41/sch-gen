import Button from './Button'

const Modal  = (props) => {
    return (
        <div id={props.id} className={'modal ' + props.modalClass}>
            <p>{props.modalType}</p>
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
                <label>Start
                    <input type='time' required id='evStart'/>
                </label>
                <label>End
                    <input type='time' required id='evEnd' />
                </label>
                <label>Color
                    <input type='color' id='evColor' />
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