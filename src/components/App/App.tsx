import React from 'react';
import './App.css';
import Header from '../Header/Header';

import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../Store/combinedReducers'

import Home from '../Home/Home'
import CreatePhonebook from '../Phonebook/Phonebook'
import { ToastContainer } from 'react-toastify';
import ViewPhoneBook from '../Phonebook/ViewPhonebook';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <ConnectedRouter history={history} >
        <div style={{ minHeight: "100vh" }}>
          <div className="col-12">
            <div className="row">
              <Switch>
                <React.Fragment>
                  <Route path='/' exact component={Home} />

                  <div className="container col-12">
                    {/* Create phonebook */}
                    <Route path='/CreatePhonebook' component={CreatePhonebook} />
                    {/* View and Search phonebook */}
                    <Route path='/ViewPhonebook' component={ViewPhoneBook} />
                  </div>

                </React.Fragment>

              </Switch>
            </div>
          </div>
        </div>
      </ConnectedRouter>

    </div>
  );
}

export default App;