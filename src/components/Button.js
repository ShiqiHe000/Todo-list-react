import PropTypes from 'prop-types'

const Button = ({ color, text, toggleShowForm}) => {

    return (
            <>
                <button className='btn' onClick={toggleShowForm} style={{backgroundColor: color}}>{text}</button>
            </>
    )
}

Button.defaultProps = {
    color: 'steelblue', 
}

Button.propTypes = {
    text: PropTypes.string, 
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
