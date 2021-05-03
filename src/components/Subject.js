const Subject = props => {
    return (
        <div className='subj-wrapper'>
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