import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'
import {RiExternalLinkFill} from 'react-icons/ri'
import Header from '../Header'
import SkillDetails from '../SkillDetails'
import SimilarJobDetails from '../SimilarJobDetails'
import './index.css'

const apiStatusConstents = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstents.initial,
    jobDetails: {},
    skills: [],
    similarJobs: [],
    lifeAtComponey: {},
  }

  componentDidMount() {
    this.getJobDetails()
  }

  retryJobDetails = () => {
    this.getJobDetails()
  }

  getJobDetailsFailure = () => (
    <div className="jobs-failed-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="job-description-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.retryJobDetails}
      >
        Retry
      </button>
    </div>
  )

  getSimilareJobsList = () => {
    const {similarJobs} = this.state
    return (
      <ul className="similar-jobs-list-container">
        {similarJobs.map(eachJob => (
          <SimilarJobDetails key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  getJobDetailsSuccess = () => {
    const {jobDetails, skills, lifeAtComponey} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
    } = jobDetails
    const {imageUrl, description} = lifeAtComponey
    return (
      <>
        <div className="jobs-item-details-container">
          <div className="company-details">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <BsStarFill className="rating-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="location-employmenttype">
              <div className="location-container">
                <MdLocationOn className="icon" />
                <p className="location-text">{location}</p>
              </div>
              <div className="location-container">
                <FaBriefcase className="icon" />
                <p className="location-text">{employmentType}</p>
              </div>
            </div>
            <p className="package-per-annum">{packagePerAnnum}</p>
          </div>
          <hr className="profile-line" />
          <div className="description-website-container">
            <h1 className="job-description-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blonk"
              className="compeny-website-link"
            >
              Visit <RiExternalLinkFill />
            </a>
          </div>
          <p className="job-item-description">{jobDescription}</p>
          <h1 className="job-description-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <SkillDetails skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="job-description-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="job-item-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="similar-jobs">Similar Jobs</h1>
        {this.getSimilareJobsList()}
      </>
    )
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstents.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedJobDetails = {
        id: data.job_details,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const updatedSkills = data.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      const updatedSimilarJobsData = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      const updatedLifeAtCompeny = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      this.setState({
        apiStatus: apiStatusConstents.success,
        jobDetails: updatedJobDetails,
        skills: updatedSkills,
        similarJobs: updatedSimilarJobsData,
        lifeAtComponey: updatedLifeAtCompeny,
      })
    } else {
      this.setState({apiStatus: apiStatusConstents.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" width="50" height="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstents.success:
        return this.getJobDetailsSuccess()
      case apiStatusConstents.failure:
        return this.getJobDetailsFailure()
      case apiStatusConstents.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="job-item-container">{this.renderJobDetailsView()}</div>
      </div>
    )
  }
}

export default JobItemDetails
