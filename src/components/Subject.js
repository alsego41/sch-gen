const Subject = props => {
    setTimeout(() => {
        let subj = document.querySelector(`#${props.id}`)
        subj.style.backgroundColor = props.color
    }, 0);
    return (
        <div className='subj-wrapper' id={props.id}>
            <p className='subject'>{props.subject}</p>
            <p className='subj-type'>{props.subjType}</p>
            <div className='subj-extra'>
                <p className='professor'>Prof. {props.professor}</p>
                <p className='classroom'>Aula {props.classroom}</p>
                <p className='commission'>Com. {props.commission}</p>
            </div>
            <p className='time'>
                {props.timeStart} - {props.timeEnd}
            </p>
        </div>
    )
}
export default Subject