import React from 'react';
import 'styles/main.css';

const Header = (props) => {
    return (
        <div className="header-style">
            {props.text}
        </div>
    );
};

export default Header;