import Home from './pages/Home';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import {LoginState} from './context/LoginContext';
import {Route, Switch} from "react-router-dom";
import "./app.css";
import Logout from './pages/Logout';
import AddPost from './pages/AddPost';
import MyPost from './pages/MyPost';

function App() {
  return (
    <div className="App">
      <LoginState>
        <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route exact path="/post/:slug">
            <Post />
          </Route>

          <Route path="/addpost">
            <AddPost />
          </Route>

          <Route path="/myposts">
            <MyPost />
          </Route>

          <Route exact path="/profile/:username">
            <Profile />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/logout">
            <Logout />
          </Route>

        </Switch>
      </LoginState>
    </div>
  );
}

export default App;
