import React from 'react';

export default class Alarm extends React.Component{
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
            <>
                <button
                    onClick={()=>{this.props.handler();func2(this.state.checkBox, this.state.time)}} className="flex-grow aspect-square m-4 relative items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 text-white">
                        <span
                              className="text-white relative w-32 h-32 inline-flex justify-center items-center bg-darkReader rounded-md group-hover:bg-opacity-0">
                        </span>
                </button>
                <input type={"time"} id={"test"} onChange={(ev)=> this.setState({time: ev.target.value })}/>
                <div class="flex items-center">
                    <input onClick={() => {this.state.checkBox ? this.setState({checkBox: false}) : this.setState({checkBox: true})}} id="default-checkbox" type="checkbox"
                           className="w-4 h-4 text-blue bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label
                                className="ml-2 text-sm fontclassNameum text-white">Default
                            checkbox</label>
                </div>

            </>
        )

        this.setState({isLoaded: true})
    }


    render() {

        if (!this.state.isLoaded){
            return(
                <p className="text-white">loading</p>
            )
        } else {
            return (
                <button>{this.state.AlarmTile}</button>
            )
        }
    }
}

export function func2(state,time){
        fetch("http://localhost:5000/result", {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "content_type": "application/json",
                },
                body: JSON.stringify({'time': [state,time]})
            }
        )


}