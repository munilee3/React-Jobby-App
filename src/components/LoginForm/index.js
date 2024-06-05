import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {errorMsg: '', username: '', password: '', isErrorMsg: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwtToken', data.jwt_token, {expires: 1})
      history.replace('/')
    } else {
      this.setState({isErrorMsg: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg, isErrorMsg} = this.state
    const token = Cookies.get('jwtToken')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
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
              Login
            </button>
            {isErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
