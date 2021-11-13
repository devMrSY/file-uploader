import React from 'react'
import  {Link}  from 'react-router-dom';



export default class App extends React.Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-row">
          <Link to="/admin-login">
            <button type="button" class="btn btn-primary">Admin Login</button>
          </Link >
          <Link to="/Registration">
          <button type="button" class="btn btn-primary">Registration</button>
          </Link>
        </div>
      </div>
    )
  }
}