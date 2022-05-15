import React from "react";
import {sendToApi} from './TilesContent'

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

        await fetch('api/react').then(res => res.json()).then(data => {
            for (let i = 0; i < Object.values(data)[0].length; i++) {
                this.state.content.push(
                    <>
                        <button
                            onClick={()=>sendToApi(Object.values(data)[0][i])} className="tiles">
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

