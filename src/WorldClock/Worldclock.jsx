import React from 'react'
import * as data from './../json/timezones.json'
import shortid from 'shortid'
import Clock from './Clock/Clock'
import './WorldClock.css'
import { useState } from 'react'

const TIMEZONES = []
data.default.forEach(tz=> (
                    tz.utc.forEach(utc=> {
                        TIMEZONES.push(
                            {
                                city: String(utc.split('/')[1]).replace('_',' '),
                                offset: tz.offset,
                                id: shortid.generate()
                            }
                        )
                    })));
        
const INITIAL_STATE = {
    clocklist: [],
    timezones: TIMEZONES,
    currentTZ: TIMEZONES.find(tz=> tz.city === "Moscow").id
}
  
    

export default function WorldClock() {

    const [state, setState] = useState(INITIAL_STATE);

    const handleClockFormSubmit = (e) => {    
        e.preventDefault();
        const data = state.timezones.find(tz => tz.id === state.currentTZ)
        setState({...state, currentTZ: INITIAL_STATE.currentTZ, clocklist: [...state.clocklist, {offset: data.offset, city: data.city, id: shortid.generate()}]})
    }

    const handleDelete = (id) => {
        setState({...state, clocklist: state.clocklist.filter(clock => (clock.id !== id))})
    }
    
    const handleChange = (e) => {
        setState({...state, currentTZ: e.target.value})
    }

      
    
    return (
        <React.Fragment>
        <div className="WorldClock" id="worldclock">
            <form className="ClockForm" onSubmit={handleClockFormSubmit}>
                <select className="TimezoneSelect" id="timezoneselect" name="timezoneselect" value={state.currentTZ} onChange={handleChange}>
                    {state.timezones.map(tz=> 
                     
                     (
                        <option key={tz.id} value={tz.id}>
                        {`${tz.city} [UTC ${tz.offset > 0 ? '+': ''}${tz.offset}]` }
                        </option>
                     )
                            
                    )}
                </select>
                <button className="ClockForm-button" type="submit">Добавить</button>
            </form>

        <div className="ClockList">
            {(state.clocklist) ? 
                state.clocklist.map(clock => {
                return (  
                <div className="ClockContainer" key={clock.id}>
                    <div className="ClockInfo">
                        <span className="City">{clock.city}</span><span className="ClockRemove" onClick={() => handleDelete(clock.id)}>✘</span>
                    </div>
                    <Clock offset={clock.offset} id={clock.id}/>
                </div>
                )}) : (null)
            }            
        </div>
        </div>
        </React.Fragment>
    )


}