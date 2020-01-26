import React from 'react';

import Title from './Title';

class Header extends React.Component {
    static defaultProps = {
        title: "Hello 🚀",
    };

    render() {
        return (
            <div style={{ backgroundColor: this.props.backgroundcolor }}>
                <Title>{this.props.title}</Title>
            </div>
        );
    }
}

export default Header;