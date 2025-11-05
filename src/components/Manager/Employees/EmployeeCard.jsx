import { MdOutlineMail } from "react-icons/md" 
import { FaUmbrellaBeach } from "react-icons/fa"
import './EmployeeCard.css'

function EmployeeCard({ employee }) {
  return (
    <div className='m-employee-card'>
      <div className='m-personal-info'>
        <p id="c-name">{employee?.name} </p>
        <p id="c-team">{employee?.team?.name}</p>
      </div>
      <div className='m-contact'>
        <p> <MdOutlineMail /> {employee?.email} </p>
      </div>
      <hr className='divider' />
      <div className='vaction-info'>
        <p><FaUmbrellaBeach /> {employee?.vaction_days_left} vacation days left</p>
      </div>
    </div>
  )
}

export default EmployeeCard