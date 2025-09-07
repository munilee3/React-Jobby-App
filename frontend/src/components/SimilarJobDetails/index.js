import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'
import './index.css'

const SimilarJobDetails = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li className="simi-jobs-list">
      <div className="company-details">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="job-description-heading">Description</h1>
      <p className="jobs-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobDetails
