import React from 'react'
import {func1} from "./TilesContent";

export default class Rooms extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hasLoaded: false,
            checkBoxes: [],
            rooms:[]
        }
    }

    async componentDidMount() {
        const rooms =  await rooms_getter()
        this.setState({rooms: rooms})
        for (let i=0; i<3; i++) {
            this.state.checkBoxes.push(
                <div>
                    <input onClick={() => func1(Object.keys(this.state.rooms)[i])} id="default-checkbox" type="checkbox"
                           className=" w-4 h-4 text-blue bg-gray-100 rounded border-gray-300 focus:ring-blue-500"/>
                    <label className="ml-2 text-sm fontclassNameum text-white">
                        Default checkbox
                    </label>
                    <p>lol</p>
                </div>
            )
        }
    this.setState({hasLoaded: true})
    }


    render(){
        const { checkBoxes } = this.state;
        if(!this.state.hasLoaded){
        return(
            <p>Hello</p>
        )} else {
            console.log(Object.values(this.state.rooms).length)
            console.log(this.state.checkBoxes)
            return(
                <>{checkBoxes}</>
            )

        }
    }
}

async function rooms_getter(){
    const rooms = {};
    await fetch('http://localhost:5000/rooms').then(res => res.json()).then(data => {
        const dataa = Object.values(data)[0];
        for (let i = 0; i < Object.values(dataa).length; i++) {
            rooms[Object.keys(dataa)[i]] = Object.values(dataa)[i]
        }
    })
    return rooms
}

