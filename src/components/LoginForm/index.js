import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    showSubmitError: false,
    errorMessage: '',
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({showSubmitError: true, errorMessage})
  }

  renderUsernameInputField = () => {
    const {usernameInput} = this.state

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={usernameInput}
          onChange={this.onChangeUsernameInput}
          placeholder="Username"
        />
      </div>
    )
  }

  renderPasswordInputField = () => {
    const {passwordInput} = this.state

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={passwordInput}
          onChange={this.onChangePasswordInput}
          placeholder="Password"
        />
      </div>
    )
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMessage} = this.state

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          {this.renderUsernameInputField()}
          {this.renderPasswordInputField()}
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
