import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import EmploymentTypeDetails from '../EmploymentTypeDetails'
import SalaryRangeDetails from '../SalaryRangeDetails'
import LocationDetails from '../LocationDetails'
import JobsList from '../JobsList'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationsList = [
  {label: 'Hyderabad', locationId: 'HYDERABAD'},
  {label: 'Bangalore', locationId: 'BANGALORE'},
  {label: 'Chennai', locationId: 'CHENNAI'},
  {label: 'Delhi', locationId: 'DELHI'},
  {label: 'Mumbai', locationId: 'MUMBAI'},
]

const apiStatusConstents = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstents.initial,
    jobsList: [],
    searchInput: '',
    typeOfEmployment: [],
    salaryRange: '',
    location: [],
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsList = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <JobsList key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  onRetryJobsList = () => {
    this.setState({apiStatus: apiStatusConstents.initial}, this.getJobsDetails)
  }

  getJobsListFailure = () => (
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
        onClick={this.onRetryJobsList}
      >
        Retry
      </button>
    </div>
  )

  tryAgainJobDetails = () => {
    this.setState({apiStatus: apiStatusConstents.initial}, this.getJobsDetails)
  }

  renderjobsListItems = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0
    return shouldShowJobsList ? (
      this.getJobsList()
    ) : (
      <div className="jobs-failed-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-img"
        />
        <h1 className="job-description-heading">No Jobs Found</h1>
        <p className="jobs-description">
          We could not find any jobs. Try other filters.
        </p>
        <button
          type="button"
          className="retry-btn"
          onClick={this.tryAgainJobDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  getJobsDetails = async () => {
    this.setState({apiStatus: apiStatusConstents.inProgress})
    const {searchInput, typeOfEmployment, salaryRange, location} = this.state
    const typeOfEmpolymentList =
      typeOfEmployment.length !== 0 ? typeOfEmployment.join(',') : ''
    const url = `https://apis.ccbp.in/jobs?employment_type=${typeOfEmpolymentList}&minimum_package=${salaryRange}&location=${location}&search=${searchInput}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resposneData = await fetch(url, options)
    const data = await resposneData.json()
    if (resposneData.ok) {
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstents.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstents.failure,
      })
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  changeEmploymentType = eventValue => {
    if (eventValue.target.checked) {
      this.setState(
        prevState => ({
          typeOfEmployment: [
            ...prevState.typeOfEmployment,
            eventValue.target.value,
          ],
        }),
        this.getJobsDetails,
      )
    } else {
      this.setState(
        prevState => ({
          typeOfEmployment: prevState.typeOfEmployment.filter(
            eachType => eachType !== eventValue.target.value,
          ),
        }),
        this.getJobsDetails,
      )
    }
  }

  changeSalaryRange = event => {
    if (event.target.checked) {
      this.setState({salaryRange: event.target.value}, this.getJobsDetails)
    }
  }

  changeLocation = eventValue => {
    if (eventValue.target.checked) {
      this.setState(
        prevState => ({
          location: [...prevState.location, eventValue.target.value],
        }),
        this.getJobsDetails,
      )
    } else {
      this.setState(
        prevState => ({
          location: prevState.location.filter(
            eachLocation => eachLocation !== eventValue.target.value,
          ),
        }),
        this.getJobsDetails,
      )
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" width="50" height="50" />
    </div>
  )

  changeSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  userSeatchInput = () => this.getJobsDetails()

  renderJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstents.success:
        return this.renderjobsListItems()
      case apiStatusConstents.failure:
        return this.getJobsListFailure()
      case apiStatusConstents.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-container">
          <div className="job-filter-details">
            <div className="user-jobs-search-container">
              <input
                type="search"
                placeholder="Search"
                className="jobs-search"
                onChange={this.onChangeSearch}
                value={searchInput}
                onKeyDown={this.changeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                aria-label="onSearch"
                onClick={this.userSeatchInput}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ProfileDetails />
            <hr className="profile-line" />
            <h1 className="type-of-employment">Type of Employment</h1>
            <ul className="employment-types-list">
              {employmentTypesList.map(eachEmploymentType => (
                <EmploymentTypeDetails
                  key={eachEmploymentType.employmentTypeId}
                  employmentTypes={eachEmploymentType}
                  changeEmploymentType={this.changeEmploymentType}
                />
              ))}
            </ul>
            <hr className="profile-line" />
            <h1 className="type-of-employment">Salary Range</h1>
            <ul className="employment-types-list">
              {salaryRangesList.map(salaryRange => (
                <SalaryRangeDetails
                  key={salaryRange.salaryRangeId}
                  salaryDetails={salaryRange}
                  changeSalaryRange={this.changeSalaryRange}
                />
              ))}
            </ul>
            <hr className="profile-line" />
            <h1 className="type-of-employment">Locations</h1>
            <ul className="employment-types-list">
              {locationsList.map(location => (
                <LocationDetails
                  key={location.locationId}
                  locationDetails={location}
                  changeLocation={this.changeLocation}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-details">
            <div className="desktop-user-jobs-search-container">
              <input
                type="search"
                placeholder="Search"
                className="desktop-jobs-search"
                onChange={this.onChangeSearch}
                value={searchInput}
                onKeyDown={this.changeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                aria-label="onSearch"
                onClick={this.userSeatchInput}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
