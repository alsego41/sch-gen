const Button = (props) => {
    return (
        <div className={props.type} id={props.id}>
            <p>{props.text}</p>
        </div>
    )
}

export default Button