import Button from './Button'

const Modal  = (props) => {
    return (
        <div id={props.id} className={'modal ' + props.modalClass}>
            <p>{props.modalType}</p>
            <div className='modal-form' id={props.idForm}>
                <label>Subject <input type='text' placeholder='Discrete Mathematics' /></label>
                <label>Subject type 
                    <select name='sel-subj-type'>
                        <option value='add-practica'>Práctica</option>
                        <option value='add-teoria'>Teoría</option>
                    </select>
                </label>
                <label>Start
                    <input type='time'/>
                </label>
                <label>End
                    <input type='time'/>
                </label>
                <label>Professor <input type='text' placeholder='González'/></label>
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