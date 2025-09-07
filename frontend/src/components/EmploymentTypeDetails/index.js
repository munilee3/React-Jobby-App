import './index.css'

const EmploymentTypeDetails = props => {
  const {employmentTypes, changeEmploymentType} = props
  const {label, employmentTypeId} = employmentTypes
  const onChangeEmploymentType = event => {
    changeEmploymentType(event)
  }
  return (
    <li className="employment-type-container">
      <input
        type="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
        onClick={onChangeEmploymentType}
      />
      <label htmlFor={employmentTypeId} className="label-text">
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeDetails
