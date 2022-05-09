import React from "react";
import {func1} from './TilesContent'

export default class Tiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newStuff: [],
            content: [],
            isLoaded: false
        }

    }

    async componentDidMount() {

        await fetch('/react').then(res => res.json()).then(data => {
            for (let i = 0; i < Object.values(data)[0].length; i++) {
                this.state.content.push(
                    <>
                        <button
                            onClick={()=>func1(Object.values(data)[0][i])} className="flex-grow aspect-square m-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 text-white">
                        <span
                            className="text-white relative w-32 h-32 inline-flex justify-center items-center bg-darkReader rounded-md group-hover:bg-opacity-0">
                            {Object.values(data)[0][i]}
                        </span>
                        </button>
                    </>)
            }
        })
        this.setState({isLoaded: true})
    }

    render() {

        if (!this.state.isLoaded){
            return(
                <p className="text-white">loading</p>
            )
        } else {
            return (
                <button onClick={this.props.handler}>{this.state.content}</button>
            )
        }
    }
}

