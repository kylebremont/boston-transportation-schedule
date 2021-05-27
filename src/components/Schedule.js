import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            api_url: 'https://api-v3.mbta.com/',
            stop_filter: 'filter[stop]=place-north',
            route_filter: 'filter[route]=CR-Haverhill,CR-Lowell,CR-Newburyport,CR-Fitchburg',
            time_filter: '',
            schedule: [],
        };
    }

    getTime() {
        const date = new Date();
        // add two hours to get the current time in Boston (Two hours ahead of MST)
        let hours = date.getHours() + 2;
        if (hours > 12) hours -= 12;
        let end_hours = hours + 3;
        if (hours < 10) hours = `0${hours}`
        if (end_hours < 10) end_hours = `0${end_hours}`

        let minutes = date.getMinutes();
        if (minutes < 10) minutes = `0${minutes}`;

        // calls the get schedule function as a callback to setting state to ensure the current time is available
        this.setState({ time_filter: `filter[min_time]=${hours}:${minutes}&filter[max_time]=${end_hours}:${minutes}` }, () => this.getSchedule())
    }

    getSchedule() {
        const { api_url, stop_filter, route_filter, time_filter } = this.state;

        fetch(`${api_url}schedules?${stop_filter}&${route_filter}&${time_filter}&sort=arrival_time`)
            .then(res => res.json())
            .then((result) => {
                const schedule = [];
                result.data.forEach(train => {
                    if (train.attributes.arrival_time) {
                        schedule.push(train);
                    }
                });
                this.setState({ schedule });
            })
    }

    componentDidMount() {
        this.getTime()
    }

    render() {
        const { schedule } = this.state;
        
        const scheduleRows = schedule.map((row, key) => {
            return (
                <tr key={key} style={{color: 'white'}} >
                    <td style={{paddingRight: 200}}>
                        <p>{row.attributes.arrival_time.substring(11, 16)}</p>
                    </td>
                    <td>
                        <p>{row.relationships.route.data.id.substring(3)}</p>
                    </td>
                </tr>
            );
        })

        return (
            <div>
                {schedule.length > 0 && (
                    <div>
                        <Table>
                            <thead>
                                <tr style={{color: 'white'}} >
                                    <th style={{paddingRight: 200}} >TIME</th>
                                    <th>DESTINATION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleRows}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        );
    }
}

export default Schedule;