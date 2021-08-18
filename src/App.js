import logo from './logo.svg';
import Home from './pages/Home';
import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddEntity from './pages/AddEntity';
import Layout from './layout';
import PlayMusic from './pages/PlayMusic';
import Login from './pages/Login';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
          <Route path="/" exact>
              { code ? <PlayMusic code={code} /> :<Login />}
            </Route>
            
            <Route path="/add-music" exact>
              <AddEntity />
            </Route>
            <Route path="*" >
              <Home />
            </Route>
          </Switch>

        </Layout>
      </Router>
    </>
  );
}

export default App;
