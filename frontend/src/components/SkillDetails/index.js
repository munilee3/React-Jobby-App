import './index.css'

const SkillDetails = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skill-container">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillDetails
