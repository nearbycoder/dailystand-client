import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import AuthRoute from './auth/AuthRoute';
import GuestRoute from './auth/GuestRoute';
const TasksPage = React.lazy(() => import('./pages/TasksPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Switch>
          <AuthRoute
            path="/tasks"
            component={TasksPage}
            pageTitle="All Tasks"
          />
          <AuthRoute
            path="/projects"
            component={ProjectsPage}
            pageTitle="Projects"
          />
          <GuestRoute exact path="/register" component={RegisterPage} />
          <GuestRoute exact path="/login" component={LoginPage} />
          <Redirect to="/tasks" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
