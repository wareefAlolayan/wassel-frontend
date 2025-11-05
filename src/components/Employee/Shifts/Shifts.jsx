import { useState, useEffect } from 'react'
import { authRequest } from '../../lib/auth'
import { useParams } from 'react-router'
import { MdOutlineDateRange } from "react-icons/md"
import './Shifts.css'

function Shifts() {
    const { employeeId } = useParams()
    const [shifts, setShifts] = useState([])
    const today = new Date()

    async function upcomingShifts() {
        const response = await authRequest({method:'get',url:'http://127.0.0.1:8000/api/shifts/'})

        const employeeShifts = response.data.filter(shift => {
            const shiftDate = new Date(shift.date)
            return shift.employees.some(emp => emp.id === Number(employeeId)) && shiftDate >= today
        })
        employeeShifts.reverse()
        setShifts(employeeShifts)
    }
    function dayName(shiftDate) {
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const date = new Date(shiftDate)
        const dayIndex = date.getDay()
        return weekDays[dayIndex]
    }
    useEffect(() => {
        upcomingShifts()
    }, [])
    return (
        <div>
            <h2>Upcoming shifts</h2>
            <div>
                {
                    shifts.length > 0 ?
                        (shifts.map((shift) => (
                            <div key={shift.id}>
                                <div className='shift-card'>
                                    <div className='shift-card-left' >
                                        <MdOutlineDateRange className='date-icon' />
                                        <div className='day-date-time'>
                                            <p className='date-test'>{shift.date} , {dayName(shift.date)}</p>
                                            <p className='time-text'>{shift.shift_type === 'M' ? '08:00 - 14:00' : '17:00 - 23:00'}</p>
                                        </div>
                                    </div>

                                    <p className={`shift-type ${shift.shift_type === 'M' ? 'morning-shift' : 'night-shift'}`}>{shift.shift_type === 'M' ? 'Morning' : 'Night'}</p> {/* conditional classes ref delftstack */}
                                </div>


                            </div>
                        ))) :
                        <p>No upcoming Shifts</p>
                }
            </div>
        </div>
    )
}

export default Shifts