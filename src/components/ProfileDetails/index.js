import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstents = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {profile: {}, apiStatus: apiStatusConstents.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  onRetryProfile = () => {
    this.getProfileDetails()
  }

  getProfileSuccess = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <div className="profile-succes-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  getProfileFailed = () => (
    <div className="profile-failed-container">
      <button type="button" className="retry-btn" onClick={this.onRetryProfile}>
        Retry
      </button>
    </div>
  )

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstents.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedProfileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profile: updatedProfileDetails,
        apiStatus: apiStatusConstents.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstents.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="profile-loader-container">
      <Loader type="ThreeDots" color="#ffffff" width="50" height="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstents.success:
        return this.getProfileSuccess()
      case apiStatusConstents.failure:
        return this.getProfileFailed()
      case apiStatusConstents.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderProfileDetails()
  }
}

export default ProfileDetails
