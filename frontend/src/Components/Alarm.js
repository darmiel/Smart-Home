import React from 'react';

export default class Alarm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            AlarmTile: []
        }
    }

    async componentDidMount() {

        this.state.AlarmTile.push(
            <>
                <button
                    onClick={this.props.handler} className="flex-grow aspect-square m-4 relative items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 text-white">
                        <span
                              className="text-white relative w-32 h-32 inline-flex justify-center items-center bg-darkReader rounded-md group-hover:bg-opacity-0">
                        </span>
                </button>
                <input type={"time"}/>
            </>

        )


        this.setState({isLoaded: true})
    }


    render() {
        const { AlarmTile } = this.state;

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