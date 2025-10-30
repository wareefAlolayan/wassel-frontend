import React from 'react'
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import './ShiftBoard.css'

function ShiftBoard() {
    return (
        <div className='board-body'>
            <div className='info'>
                <div className='summary-box'>
                    <div className='summary-title'>Coverage</div>
                    <div className='summary-value'>100%</div>
                </div>
                <div className='summary-box'>
                    <div className='summary-title'>Open Requests</div>
                    <div className='summary-value'>4</div>
                </div>
                <div className='summary-box'>
                    <div className='summary-title'>On Leave</div>
                    <div className='summary-value'>0</div>
                </div>
            </div>
            <div className='shift-board-container'>
                <div className='board-nav'>
                    Week dd-mm
                    <div className='week-nav'>
                        <button className='nav-btn'> <MdNavigateBefore /> </button>
                        <button className='nav-btn'> <MdNavigateNext /> </button>
                    </div>

                </div>
                <div className='shifts-table'>
                    <thead>
                        <tr>
                            <th>Shift type</th>
                            <th><div>Sunday</div><div>date</div></th>
                            <th><div>Monday</div><div>date</div></th>
                            <th><div>Tuesday</div><div>date</div></th>
                            <th><div>Wednesday</div><div>date</div></th>
                            <th><div>Thursday</div><div>date</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Morning ☀️</td>
                            <td>
                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'orange' }}></div>  Sarah
                                </div>

                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                </div>
                            </td>

                            <td>
                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'orange' }}></div>  Sarah
                                </div>

                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                </div>
                            </td>

                            <td>
                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'orange' }}></div>  Sarah
                                </div>

                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                </div>
                            </td>

                            <td>
                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'orange' }}></div>  Sarah
                                </div>

                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                </div>
                            </td>

                            <td>
                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'orange' }}></div>  Sarah
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
                                    <div className="status-dot" style={{ backgroundColor: 'orange' }}></div>  Sarah
                                </div>

                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                </div>
                            </td>

                            <td>
                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'orange' }}></div>  Sarah
                                </div>

                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                </div>
                            </td>

                            <td>
                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'orange' }}></div>  Sarah
                                </div>

                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                </div>
                            </td>

                            <td>
                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'orange' }}></div>  Sarah
                                </div>

                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                </div>
                            </td>
                            <td>
                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'orange' }}></div>  Sarah
                                </div>

                                <div className="employee-chip">
                                    <div className="status-dot" style={{ backgroundColor: 'purple' }}></div> Wareef
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </div>
            </div>
        </div>
    )
}

export default ShiftBoard