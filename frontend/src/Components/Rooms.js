import React from 'react'
import {rooms_getter, sendToApi} from "./ApiFunctions";

export default class Rooms extends React.Component {
    promisedSetState;

    constructor(props) {
        super(props);
        this.state = {
            hasLoaded: false,
            checkBoxes: [],
            rooms: [],
            msg: '',
            number: 0

        }
    }

    async componentDidMount() {
        this.promisedSetState = (newState) => new Promise(resolve => this.setState(newState, resolve));
        const rooms = await rooms_getter()
        this.setState({rooms: rooms},)
        for (let i = 0; i < 3; i++) {
            this.state.checkBoxes.push(
                <></>
            )
        }
        this.setState({hasLoaded: true})
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.msg !== prevState.msg || this.state.number === 0) {
            for (let i = 0; i < 3; i++) {
                await sendToApi(Object.keys(this.state.rooms)[i])
                var cool = await Object.values(await rooms_getter())[i]
                this.state.checkBoxes[i] = (
                    <div>
                        <input onClick={() => {
                            this.setState({msg: !this.state.msg});
                        }} checked={cool} id="default-checkbox" type="checkbox"
                               className=" w-4 h-4 text-blue bg-gray-100 rounded border-gray-300 focus:ring-blue-500"/>
                        <label className="ml-2 text-sm text-white">
                            {Object.values(this.state.rooms)[i]}
                        </label>
                    </div>
                )
            }
        }
        if (this.state.number === 0) {
            this.setState({number: 2})
        }
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

