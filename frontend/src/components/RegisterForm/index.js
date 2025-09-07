import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', email: '', password: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password, email} = this.state
    if (username && email && password) {
      const userDetails = {username, password, email}
      const apiUrl = 'http://localhost:4000/register'
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      })
      if (response.ok) {
        const {history} = this.props
        history.push('/login')
      } else {
        alert('missing details')
      }
    } else {
      alert('missing fields')
    }
  }

  render() {
    const {username, email, password} = this.state
    return (
      <div className="jobby-app">
        <div className="app-login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="Username" className="label-text">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              className="user-inputs"
              id="Username"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="email" className="label-text">
              EMAIL
            </label>
            <input
              type="text"
              placeholder="Email"
              className="user-inputs"
              id="email"
              onChange={this.onChangeEmail}
              value={email}
            />
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="user-inputs"
              onChange={this.onChangePassword}
              value={password}
            />
            <button type="submit" className="login-btn">
              Register
            </button>
            <p className="already-have-acount-text">
              Already have an account{' '}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
