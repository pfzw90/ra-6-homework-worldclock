import React from 'react'
import ReactDOM from 'react-dom'
import * as data from './../json/timezones.json'
import shortid from 'shortid'
import Clock from './Clock/Clock'
import './WorldClock.css'

const TIMEZONES = data.default;
  
    

export default function WorldClock() {

    const handleClockFormSubmit = (e) => {    
        e.preventDefault();
        const id = shortid.generate();
        const data = Array.from(e.target.timezoneselect.options).find(o=>o.selected).dataset
        const clock = <Clock offset={data.offset} city={data.city} id={id}/>
        const container = document.createElement('div');
        container.id = id;
        document.getElementById("worldclock").appendChild(container)
        ReactDOM.render(clock, container);
        e.target.reset()
    }
      
    
    return (
        <div className="WorldClock" id="worldclock">
            <form className="ClockForm" onSubmit={handleClockFormSubmit}>
                <select className="TimezoneSelect" id="timezoneselect" name="timezoneselect">
                    {TIMEZONES.map(tz=> (
                        tz.utc.map(utc=> 
                            {const city = String(utc.split('/')[1]).replace('_',' ')
                            return (<option key={shortid.generate()} data-offset={tz.offset} data-city={city}>
                                {
                                `${city} 
                                [UTC ${tz.offset > 0 ? '+': ''}${tz.offset}]`
                                }
                                </option>)
                            })
                    ))}
                </select>
                <button className="ClockForm-button" type="submit">Добавить</button>
            </form>
        </div>
    )


}