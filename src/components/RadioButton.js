const RadioButton = (props) => {
    return (
        <div style={{backgroundColor: props.color}} className={props.classRadio} onClick={props.radioBtnClick}>
            <p>{props.text}</p>
        </div>
    )
}

export default RadioButton