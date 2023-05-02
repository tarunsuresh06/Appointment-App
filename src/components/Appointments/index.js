import {v4} from 'uuid'
import {format} from 'date-fns'
import {Component} from 'react'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    name: '',
    date: '',
    appointmentList: [],
    isFilterOn: false,
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {name, date} = this.state

    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      name,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      name: '',
      date: '',
    }))
  }

  toggleStarred = id => {
    const {appointmentList} = this.state

    this.setState({
      appointmentList: appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    })
  }

  toggleFilterStarred = () => {
    this.setState(prevState => ({
      isFilterOn: !prevState.isFilterOn,
    }))
  }

  getFilteredAppointmentList = () => {
    const {isFilterOn, appointmentList} = this.state

    if (isFilterOn) {
      return appointmentList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {name, date, isFilterOn} = this.state

    const filterClassName = isFilterOn ? 'star-filter' : ''

    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="app-container">
        <div className="appointment-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="appointment-input-container">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <label htmlFor="Title" className="form-label">
                TITLE
              </label>
              <input
                id="Title"
                type="text"
                value={name}
                className="form-input"
                onChange={this.onChangeName}
                placeholder="Title"
              />
              <label htmlFor="Date" className="form-label">
                DATE
              </label>
              <input
                id="Date"
                type="date"
                value={date}
                onChange={this.onChangeDate}
                className="form-input"
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointment-image"
              alt="appointments"
            />
          </div>
          <div className="appointment-list-heading-container">
            <h1 className="item-heading">Appointments</h1>
            <button
              type="button"
              className={`${filterClassName} starred-btn`}
              onClick={this.toggleFilterStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredAppointmentList.map(appointmentDetails => (
              <AppointmentItem
                key={appointmentDetails.id}
                appointmentDetails={appointmentDetails}
                toggleStarred={this.toggleStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
