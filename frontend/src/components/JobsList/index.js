import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'
import './index.css'

const JobsList = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link className="jobs-list-link" to={`jobs/${id}`}>
      <li className="jobs-list-container">
        <div className="company-details">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="job-description-heading">Description</h1>
        <p className="jobs-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsList
