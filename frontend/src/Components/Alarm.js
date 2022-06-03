import React from 'react';

export default class Alarm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            AlarmTile: [],
            checkBox: false,
            time: []
        }
    }

    async componentDidMount() {

        this.state.AlarmTile.push(
            <div className="flex flex-row items-center">
                <button onClick={() => {
                    this.props.handler();
                    alarmAPI(this.state.checkBox, this.state.time)
                }} className="tiles">
                    <span
                        className="text-white relative w-32 h-32 inline-flex justify-center items-center bg-darkReader rounded-md group-hover:bg-opacity-0">Send Alarm</span>
                </button>
                <div className="flex items-center, flex-col">
                    <input type={"time"} id={"test"} onChange={(ev) => this.setState({time: ev.target.value})}/>
                    <div className="flex items-center m-2">
                        <input onClick={() => {
                            this.state.checkBox ? this.setState({checkBox: false}) : this.setState({checkBox: true})
                        }} id="default-checkbox" type="checkbox"
                               className="w-4 h-4 text-blue bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label className="ml-2 text-sm text-white">Set Alarm</label>
                    </div>
                </div>

            </div>
        )

        this.setState({isLoaded: true})
    }


    render() {

        if (!this.state.isLoaded) {
            return (
                <p className="text-white">loading</p>
            )
        } else {
            return (
                <button>{this.state.AlarmTile}</button>
            )
        }
    }
}

export function alarmAPI(state, time) {
    fetch("api/result", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content_type": "application/json",
            },
            body: JSON.stringify({'time': [state, time]})
        }
    )


}