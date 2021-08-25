import moment from 'moment'
import React from 'react'


export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.offset = parseInt(props.offset)
        this.id = props.id
        this.city = props.city;
        this.currentTime = moment.utc().utcOffset(this.offset).toObject() 
        this.state = {
            hours: this.currentTime.hours,
            minutes: this.currentTime.minutes,
            seconds: this.currentTime.seconds 
        }     
    }   

    componentDidMount () {      
        this.hoursTimer = setInterval(()=>this.setState((prev)=> ({...prev, hours: prev.hours + 1})), 1000 * 60 * 60);
        this.minutesTimer = setInterval(()=>this.setState((prev)=> ({...prev, minutes: prev.minutes + 1})), 1000 * 60);
        this.secondsTimer = setInterval(()=>this.setState((prev)=> ({...prev, seconds: prev.seconds + 1})), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.hoursTimer);
        clearInterval(this.minutesTimer);
        clearInterval(this.secondsTimer);
    }

    render() {
        return(
            <div className="Clock">
                <div className="wrap">
                    <span className="hour" style={{transform :`rotate(${this.state.hours*30}deg)`}}></span>
                    <span className="minute"style={{transform :`rotate(${this.state.minutes*6}deg)`}}></span>
                    <span className="second"style={{transform :`rotate(${this.state.seconds*6}deg)`}}></span>
                    <span className="dot"></span>
                </div>
            </div>
        )
    }
}