import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Button from './Button';

const Header = ({ title, toggleShowForm, showAdd }) => {

    function buttonText(show) {
        return show ? 'Add' : 'Close';
    }

    function buttonColor(show) {
        return show ? 'green' : 'hsl(0, 100%, 45%)';
    }

    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' &&
                <Button
                    color={buttonColor(showAdd)}
                    text={buttonText(showAdd)}
                    toggleShowForm={toggleShowForm}
                />
            }
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}
Header.propTypes = {
    title: PropTypes.string
}
export default Header
