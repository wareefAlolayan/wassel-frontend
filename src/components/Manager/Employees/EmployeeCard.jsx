import React from 'react'

function EmployeeCard({employee}) {
  return (
    <div>
        <h3>{employee.name} - {employee.team.name}</h3>
        <p> email : {employee.email} </p>
        <p> Vacation days left : {employee.vaction_days_left}</p>
    </div>
  )
}

export default EmployeeCard