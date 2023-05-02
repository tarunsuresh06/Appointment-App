import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarred} = props

  const {id, name, date, isStarred} = appointmentDetails

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStarred(id)
  }

  return (
    <li className="appointment-item-container">
      <div className="appointment-content">
        <p className="appointment-name">{name}</p>
        <p className="appointment-date">{date}</p>
      </div>
      <button
        className="star-btn"
        type="button"
        data-testid="star"
        onClick={onClickStar}
      >
        <img className="star-image" src={starImageUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
