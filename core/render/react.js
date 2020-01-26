import { renderToString } from 'react-dom/server';
import React from 'react';

function renderReact({ data }) {
    const content = (
        <React.Fragment>
            {data.map((item) => {
                const Component = require(`../../components/${item.type}`).default;
                const props = item.props;

                return (<Component key={item.type} {...props} />);
            })}
        </React.Fragment>
    );
    
    return renderToString(content);
}

export default renderReact;
