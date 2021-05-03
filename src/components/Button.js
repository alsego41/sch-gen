const Button = (props) => {
    return (
        <div className='btn' id={props.id}>
            <p>{props.text}</p>
        </div>
    )
}

export default Button