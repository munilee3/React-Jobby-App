import './index.css'

const LocationDetails = props => {
  const {locationDetails, changeLocation} = props
  const {locationId, label} = locationDetails
  const onChangeLocation = event => {
    changeLocation(event)
  }

  return (
    <li className="employment-type-container">
      <input
        type="checkbox"
        id={locationId}
        value={locationId}
        onClick={onChangeLocation}
      />
      <label htmlFor={locationId} className="label-text">
        {label}
      </label>
    </li>
  )
}

export default LocationDetails
