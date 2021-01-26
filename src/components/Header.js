import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const Header = (props) => {
    return (
        <header className="header">
            <h1>{props.title}</h1>
            <Button color={props.show ? 'red' : 'green'} text={props.show ? 'Close' : 'Add'} onClick={props.showForm} />

        </header>

    )
}

Header.defaultProps = {
    title: "Default",
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;
