import React from 'react'
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import './ShiftBoard.css'

function ShiftBoard() {
    return (
        <div className='board-body'>
            <div className='info'>
kjhdsdfghj
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
                            <td>Morning</td>
                            <td>employees list</td>
                            <td>employees list</td>
                            <td>employees list</td>
                            <td>employees list</td>
                            <td>employees list</td>
                        </tr>
                        <tr>
                            <td>Night</td>
                            <td>employees list</td>
                            <td>employees list</td>
                            <td>employees list</td>
                            <td>employees list</td>
                            <td>employees list</td>
                        </tr>
                    </tbody>
                </div>
            </div>
        </div>
    )
}

export default ShiftBoard