const RadioButton = (props) => {
    return (
        <div style={{backgroundColor: props.color}} className={props.classRadio}>
            <p>{props.text}</p>
        </div>
    )
}

export default RadioButton