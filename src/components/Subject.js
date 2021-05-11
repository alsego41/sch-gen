const Subject = props => {
    return (
        <div className='subj-wrapper' id={props.id} style={{backgroundColor: props.color}} key={props.id} 
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