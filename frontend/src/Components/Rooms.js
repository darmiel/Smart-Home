import React from 'react'
import {roomsGetter, sendToApi} from "./ApiFunctions";

export default class Rooms extends React.Component {
    promisedSetState;

    constructor(props) {
        super(props);
        this.state = {
            hasLoaded: false,
            checkBoxes: [],
            rooms: [],

        }
    }

    async componentDidMount() {
        this.promisedSetState = (newState) => new Promise(resolve => this.setState(newState, resolve));
        const rooms = await roomsGetter()
        this.setState({rooms: rooms},)
        for (let i = 0; i < 3; i++) {
            this.state.checkBoxes.push(
                <></>
            )
        }
        this.setState({hasLoaded: true})
    }


    render() {

        const {checkBoxes} = this.state;
        if (!this.state.hasLoaded) {
            return (
                <p>Hello</p>
            )
        } else {
            return (
                <>{checkBoxes}</>
            )

        }
    }
}

