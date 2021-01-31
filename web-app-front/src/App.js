import React from 'react'
import Header from './components/Header/Header'
import Context from './context';
import Authorization from './components/Auth/Authorization'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Registration from './components/Auth/Registration'
import UserPage from './components/UserPage/UserPage';
import CreateCollection from './components/UserPage/CreateCollection/CreateCollection';
import CollectionView from './components/Content/CollectionView';
import UpdateCollection from './components/UserPage/UpdateCollection/UpdateCollection';
import ItemsPage from './components/Content/ItemsPage';
import CreateItem from './components/UserPage/Collections/Items/CreateItem';
import ItemView from './components/Content/ItemView';
import UpdateItem from './components/UserPage/Collections/Items/UpdateItem';
import SearchItemsPage from './components/Content/SearchItemsPage';

function App() {
  
  const [user, setUser] = React.useState(undefined)//{username: 'Max'}); 
  
  if(user === undefined)
  {
    if(JSON.parse(localStorage.getItem("user")))
      setUser(JSON.parse(localStorage.getItem("user")));
  }

  return (
    <Context.Provider value = {{user, setUser}}>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route path="/login" component={Authorization} />
          <Route path="/register" component = {Registration} />
          <Route path="/userPage" component = {UserPage} />
          <Route path="/createCollection" component = {CreateCollection} />
          <Route exact path="/collection/:id" component = {CollectionView} />
          <Route path="/updateCollection/:id" component = {UpdateCollection} />
          <Route exact path="/collection/:id/items" component = {ItemsPage} />
          <Route path="/createItem/:id" component = {CreateItem} />
          <Route exact path="/item/:id" component = {ItemView} />
          <Route path="/updateItem/:id" component = {UpdateItem} />
          <Route path="/items" component = {SearchItemsPage} />
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
