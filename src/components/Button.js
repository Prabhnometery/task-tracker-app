import PropTypes from 'prop-types'

const Button  = ({ color, text, onClick }) => {


    return <button onClick={onClick} style={{ backgroundColor: color}} className="btn">{text}</button>
}

Button.prototype = {
    text: PropTypes.string,
    color: PropTypes.string
}

Button.defaultProps = {
    color: 'steelblue',
}

export default Button;