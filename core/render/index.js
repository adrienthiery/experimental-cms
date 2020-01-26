import fs from 'fs';
import ejs from 'ejs';
import renderReact from './react';

export default async (data) => {
    /**
     * renderToString() will take our React app and turn it into a string
     * to be inserted into our Html template function.
     */
    const body = renderReact(data);
  
    const templatedPage = await ejs.renderFile(
      './core/templates/index.ejs',
      {
        body,
        title: data.name,
      },
      { async: true }
    );

    let filename;

    if (data.url === '/') {
      filename = 'index';
    } else {
      filename = data.id;
    }
    
    await fs.promises.writeFile(`./dist/${filename}.html`, templatedPage, 'utf8');

    return true;
}  