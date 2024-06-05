import './index.css'

const SalaryRangeDetails = props => {
  const {salaryDetails, changeSalaryRange} = props
  const {salaryRangeId, label} = salaryDetails
  const onChangeSalaryRange = event => {
    changeSalaryRange(event)
  }
  return (
    <li className="employment-type-container">
      <input
        type="radio"
        id={salaryRangeId}
        value={salaryRangeId}
        onClick={onChangeSalaryRange}
        name="salary-radio"
      />
      <label htmlFor={salaryRangeId} className="label-text">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeDetails
