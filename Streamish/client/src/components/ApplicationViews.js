import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import VideoList from "./VideoList";
import VideoForm from "./VideoForm";
import VideoDetails from "./VideoDetails";
import UserVideos from './UserVideos';
import Login from "./Login";
import Register from "./Register";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <Switch>
      <Route path="/" exact>
      {isLoggedIn ? <VideoList /> : <Redirect to="/login" />}
        <VideoList />
      </Route>

      <Route path="/videos/add">
      {isLoggedIn ? <VideoForm /> : <Redirect to="/login" />}
        <VideoForm />
      </Route>

      <Route path="/videos/:id">
      {isLoggedIn ? <VideoDetails /> : <Redirect to="/login" />}
        
        {/* TODO: Video Details Component */}
      </Route>

      <Route path="/users/:id">
      {isLoggedIn ? <UserVideos /> : <Redirect to="/login" />}
        
        {/* TODO: Video Details Component */}
      </Route>
      <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

    </Switch>
  );
};

