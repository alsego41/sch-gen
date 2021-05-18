const Subject = props => {
    return (
        <div className='subj-wrapper' name={props.name} style={{backgroundColor: props.color}} 
        onClick={props.handleEventClick}>
            <p className='subject'>{props.subject}</p>
            <p className='subj-dsc'>{props.subjDsc}</p>
            <p className='time'>
                {props.timeStart} - {props.timeEnd}
            </p>
        </div>
    )
}

export default Subject