import React, { Component } from 'react';
import './App.css';

function App() {
  const [user_id, setUserId] = React.useState('');
  const [alias, setAlias] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayMessage, setDisplayMessage] = React.useState('');

  const port_id = 8080; 
  const http_host = "http://localhost:" + port_id +  "/";

  function serverConnection(type, body_info) {
    setDisplayMessage("Processing");
    const requestInformation = {
      method : type,
      headers: { 'Content-Type': 'application/json' },
      body: body_info
    };
    fetch(http_host, requestInformation)
    .then(res => res.json())
    .then(data => {
      let to_set = data.message.toString(); 
      setDisplayMessage(to_set);
    });
  }

  function getInformation(){
    serverConnection('POST', JSON.stringify( {user : user_id, label : alias} ) );
  }

  function addPassword() {
    serverConnection('PUT', JSON.stringify( { user: user_id, label : alias, login : username, pass : password } ) );
  }

  function updatePassword() {
    serverConnection('PATCH', JSON.stringify( { user: user_id, label : alias, login : username, pass : password } ) );
  }

  function removePassword() {
    serverConnection('DELETE', JSON.stringify( {user : user_id, label : alias} ) );
  }

  return (
    <div className="App">
      <h1>Password Manager</h1>
      <h2>Input Fields</h2>
      <label>User ID:</label>
      <input type = "text" value={user_id} onChange={event => setUserId(event.target.value)}/>
      <label>Website:</label>
      <input type = "text" value={alias} onChange={event => setAlias(event.target.value)}/>
      <label>Username:</label>  
      <input type = "text" value={username} onChange={event => setUsername(event.target.value)}/>
      <label>Password:</label>
      <input type = "text" value={password} onChange={event => setPassword(event.target.value)}/>
      <h2>Avaliable Functions</h2>
      <div class="buttons-flex">
        <button id="Info" onClick = {getInformation}>Get Information</button>
        <button id="Add" onClick = {addPassword}>Add Password</button>
        <button id="Update" onClick = {updatePassword}>Update Password</button>
        <button id="Remove" onClick = {removePassword}>Remove Password</button>
      </div>
      <h2>Program Results</h2>
      <p>{displayMessage}</p>
    </div>
  );

}

export default App;