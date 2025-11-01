import React from 'react'
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import './ShiftBoard.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function ShiftBoard() {
    const today = new Date() //ref reactgo Fri Oct 31 2025 17:09:20 GMT+0300 (Arabian Standard Time
    const thisWeekFirstDay = getFirstDayOfWeek(today)
    const [firstDay, setFirstDay] = useState(thisWeekFirstDay)
    const [weekDays, setWeekDays] = useState({})
    const [shifts, setShifts] = useState([])
    const [errors, setErrors] = useState(null)

    async function getShifts() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/shifts`)
            console.log(response.data)
            setShifts(response.data)
        } catch (error) {
            console.log(error)
            setErrors(error?.response?.data?.error)
        }
    }

    function getFirstDayOfWeek(today) {
        const dayIndex = today.getDay()  // 0=Sun 6=Sat
        const firstDay = new Date(today) //create copy of today 
        firstDay.setDate(today.getDate() - dayIndex) // go back to sunday
        return firstDay
    }

    function createWeekDict(firstDay) {
        const week = {}
        for (let i = 0; i < 7; i++) {
            const d = new Date(firstDay)
            d.setDate(firstDay.getDate() + i)
            week[i] = {
                code: i,// 0–6
                dayDate: d.getDate(),  // 31
                fullDate: d.toLocaleDateString('en-CA') //mozilla+stackoverflow 
            }
        }
        return week
    }
    console.log(createWeekDict(firstDay))

    function goPrevWeek() {
        const d = new Date(firstDay)
        d.setDate(d.getDate() - 7)
        setFirstDay(d)
    }
    function goNextWeek() {
        const d = new Date(firstDay)
        d.setDate(d.getDate() + 7)
        setFirstDay(d)
    }


    useEffect(() => {
        getShifts()
        setWeekDays(createWeekDict(firstDay))
    }, [firstDay])


    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
    const fiveDayCodes = [0, 1, 2, 3, 4]
    const colors = ['#F59E0B', '#06B6D4', '#EC4899', '#84CC16', '#8B5CF6', '#14B8A6', '#F97316', '#6366F1']
    function getColorForEmployee(employeeId) {
        return colors[employeeId % colors.length]
    }

    function getEmployeesForShift(shiftType, dayDate) {
        const findShifts = shifts.filter(shift => shift.date === dayDate && shift.shift_type === shiftType)
        if (findShifts.length > 0) {
            return findShifts[0].employees.map(emp => {
                const color = getColorForEmployee(emp.id)
                return (
                    <div className="employee-chip" key={emp.id}>
                        <div className="dot" style={{ backgroundColor: color }}></div>
                        {emp.name}
                    </div>
                )
            }
            )
        }
    }

    if (errors) {
        return <h3>{errors}</h3>
    }
    return (
        <div className='board-body'>
            <div className='info'>
                <div className='summary-box'>
                    <div className='summary-title'>Coverage</div>
                    <div className='summary-value'>100%</div>
                </div>
                <div className='summary-box red'>
                    <div className='summary-title'>Open Requests</div>
                    <div className='summary-value'>4</div>
                </div>
                <div className='summary-box yellow'>
                    <div className='summary-title'>On Leave</div>
                    <div className='summary-value'>0</div>
                </div>
            </div>
            <div className='shift-board-container'>
                <div className='board-nav'>
                    {/* ? from stackoverflow */}
                    Week {weekDays[0]?.fullDate} — {weekDays[4]?.fullDate}
                    <div className='week-nav'>
                        <button className='nav-btn' onClick={goPrevWeek}> <MdNavigateBefore /> </button>
                        <button className='nav-btn' onClick={goNextWeek}> <MdNavigateNext /> </button>
                    </div>

                </div>
                <div className='shifts-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Shift type</th>
                                {fiveDayCodes.map(c => (
                                    <th key={c}>
                                        <div>{dayNames[c]}</div>
                                        <div>{weekDays[c]?.dayDate}</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Morning ☀️</td>
                                {fiveDayCodes.map((dayCode) => (
                                    <td key={dayCode}>
                                        {getEmployeesForShift('M', weekDays[dayCode]?.fullDate)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Night 🌙</td>

                                {fiveDayCodes.map((dayCode) => (
                                    <td key={dayCode}>
                                        {getEmployeesForShift('N', weekDays[dayCode]?.fullDate)}
                                    </td>
                                ))}
                            </tr>
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    )
}

export default ShiftBoard