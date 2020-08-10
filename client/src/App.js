import React from 'react';
import FarmList from './components/Farm/FarmList'
import FarmAdd from './components/Farm/FarmAdd'
import PondList from './components/Pond/PondList'
import PondAdd from './components/Pond/PondAdd'
// import TodoAdd from './components/TodoAdd/TodoAdd'
import { BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/add-farm" component={FarmAdd} />
          <Route path="/add-pond" component={PondAdd} />
          <Route path="/edit-farm" component={FarmAdd} />
          <Route path="/edit-pond" component={PondAdd} />
          <Route path="/pond" component={PondList} />
          <Route path="/" component={FarmList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
