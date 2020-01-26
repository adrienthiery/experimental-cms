import React from 'react';

import Title from './Title';

const Footer = ({ title, copyright }) => (
    <div>
        <Title>{title}</Title>
        <span>{copyright}</span>
    </div>
);

Footer.defaultProps = {
    title: "Bye 🚀",
};

export default Footer;