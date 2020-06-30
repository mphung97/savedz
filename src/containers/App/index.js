import { createRenderer } from 'fela';
import React from 'react';
import { RendererProvider } from 'react-fela';
import { IntlProvider } from 'react-intl';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Client, Provider } from 'urql';
import PrivateRoute from '../../components/PrivateRoute';
import en from '../../i18n/en.json';
import vi from '../../i18n/vi.json';
import Home from '../Home';
import SignIn from '../SignIn';
import { appState } from './atom';

const messages = { en, vi };
const renderer = createRenderer();

renderer.renderStatic(`
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body {
    font-size: 1rem;
    font-weight: 400;
    font-family: 'Roboto','Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    color: #1D1D1D;
    position: relative;
    min-height: 100vh;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  dl,
  dd,
  ol,
  ul,
  menu,
  figure,
  blockquote,
  p,
  pre,
  form {
    margin: 0;
  }
  menu,
  ol,
  ul {
    padding: 0;
    list-style: none;
    list-style-image: none;
  }
  main {
    display: block;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a,
  button,
  input {
    -webkit-tap-highlight-color: transparent;
  }
  img,
  svg {
    vertical-align: middle;
  }
  button {
    background: transparent;
    overflow: visible;
    border: none;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  `);
renderer.renderFont('Roboto', [
  'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
]);

const client = new Client({
  url: process.env.GRAPHQL_ENDPOINT,
  fetchOptions: {
    credentials: 'include',
  },
});
// eslint-disable-next-line no-unused-vars
const App = () => {
  const { locale } = useRecoilValue(appState);

  return (
    <Provider value={client}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <RendererProvider renderer={renderer}>
          <Router>
            <Switch>
              <Route path="/signin" exact>
                <SignIn />
              </Route>
              <PrivateRoute path="/" exact>
                <Home />
              </PrivateRoute>
            </Switch>
          </Router>
        </RendererProvider>
      </IntlProvider>
    </Provider>
  );
};

export default App;
