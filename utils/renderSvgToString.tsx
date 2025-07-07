import type { ReactElement } from 'react';

const getData = async (component: ReactElement): Promise<string> => {
  const ReactDOMServer = (await import('react-dom/server')).default;
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(component);
  return staticMarkup;
};

export default getData;

