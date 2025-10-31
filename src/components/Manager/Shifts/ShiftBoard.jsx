import React from 'react'
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import './ShiftBoard.css'
import { useState, useEffect } from 'react'

function ShiftBoard() {
    const today = new Date() //ref reactgo Fri Oct 31 2025 17:09:20 GMT+0300 (Arabian Standard Time
    const thisWeekFirstDay = getFirstDayOfWeek(today)
    const [firstDay, setFirstDay] = useState(thisWeekFirstDay)
    const [weekDays, setWeekDays] = useState({})
    // const todayDate = today.toLocaleDateString() //ref medium  10/31/2025
    // const todayCode = today.getDay() // 0-6
    // console.log(today)
    // console.log(todayDate)
    // console.log(todayCode)

    function getFirstDayOfWeek(today) {
        const dayIndex = today.getDay()  // 0=Sun 6=Sat
        const firstDay = new Date(today) //create copy of today 
        firstDay.setDate(today.getDate() - dayIndex) // go back to sunday
        return firstDay
    }
    console.log('first day ' + firstDay)

    function createWeekDict(firstDay) {
        const week = {}
        for (let i = 0; i < 7; i++) {
            const d = new Date(firstDay)
            d.setDate(firstDay.getDate() + i)
            week[i] = {
                code: i,// 0–6
                dayDate: d.getDate(),  // 31
                fullDate: d.toLocaleDateString()
            }
        }
        return week
    }


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
        setWeekDays(createWeekDict(firstDay))
    }, [firstDay])


    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
    const fiveDayCodes = [0, 1, 2, 3, 4]

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
                                <td>
                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'green' }}></div>  Sarah
                                    </div>

                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef Alolayan
                                    </div>
                                </td>

                                <td>
                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'green' }}></div>  Sarah
                                    </div>

                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                    </div>
                                </td>

                                <td>
                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'green' }}></div>  Sarah
                                    </div>

                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                    </div>
                                </td>

                                <td>
                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'green' }}></div>  Sarah
                                    </div>

                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                    </div>
                                </td>

                                <td>
                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'green' }}></div>  Sarah
                                    </div>

                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Night 🌙</td>

                                <td>
                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'green' }}></div>  Sarah
                                    </div>

                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                    </div>
                                </td>

                                <td>
                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'green' }}></div>  Sarah
                                    </div>

                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                    </div>
                                </td>

                                <td>
                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'green' }}></div>  Sarah
                                    </div>

                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                    </div>
                                </td>

                                <td>
                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'green' }}></div>  Sarah
                                    </div>

                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                    </div>
                                </td>
                                <td>
                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'green' }}></div>  Sarah
                                    </div>

                                    <div className="employee-chip">
                                        <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                    </div>
                                </td>
                            </tr>
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    )
}

export default ShiftBoard