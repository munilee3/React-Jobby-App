import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome, IoMdExit} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
      </Link>
      <ul className="mobile-icons-container">
        <li className="mobile-view-icons">
          <Link to="/" className="icon-link">
            <IoMdHome />
          </Link>
        </li>
        <li className="mobile-view-icons">
          <Link to="/jobs" className="icon-link">
            <BsBriefcaseFill />
          </Link>
        </li>
        <li className="mobile-view-icons">
          <button
            type="button"
            className="sm-logout-btn"
            onClick={onClickLogout}
            aria-label="logout-btn"
          >
            <IoMdExit className="logout-icon" />
          </button>
        </li>
      </ul>
      <ul className="desktop-view-menu">
        <Link to="/" className="nav-link">
          <li className="menu-options">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="menu-options">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
