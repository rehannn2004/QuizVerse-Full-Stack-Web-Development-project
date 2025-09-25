import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Layout/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import QuizList from './components/Quiz/QuizList';
import Quiz from './components/Quiz/Quiz';
import QuizResult from './components/Quiz/QuizResult';
import Leaderboard from './components/Leaderboard/Leaderboard';
import ChatBox from './components/Chat/ChatBox';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute exact path="/" component={QuizList} />
              <PrivateRoute path="/quiz/:id" component={Quiz} />
              <PrivateRoute path="/result/:id" component={QuizResult} />
              <PrivateRoute path="/leaderboard/:subject" component={Leaderboard} />
              <PrivateRoute path="/chat" component={ChatBox} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;