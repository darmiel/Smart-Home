import React from 'react';
import PresetColors from './PresetColors'
import Alarm from './Alarm'
import Rooms from "./Rooms";


export default class Tiles extends React.Component {

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this)
        this.state= {
            tiles: [],
            showTiles: true,
            tileContents: [],
            isLoaded: false,
        }
    }

    handler(){

            this.setState({
                tileContents : []
            })


    }


    async componentDidMount() {

        const tileNames = await tileName_getter()
        for (let i = 0; i < tileNames.length; i++) {
            this.state.tiles.push(
                <>
                    <button
                        onClick={() => {
                            this.setState({tileContents: tileNames[i]})
                        }}
                        className="tiles">
                        <span key={"hallo" + [i]}
                              className="text-white relative w-32 h-32 inline-flex justify-center items-center bg-darkReader rounded-md">
                         {tileContent(tileNames[i])}
                        </span>
                    </button>
                </>
            )
        }
        this.setState({isLoaded: true})
    }



    render() {
        //this.createTiles()
        if (!this.state.isLoaded){
            return(
                <p className="text-white">Loading</p>
            )
        }
        if (this.state.tileContents.length === 0){
            return (
                <div>
                    {this.state.tiles}

                </div>
            )
        } else if (this.state.tileContents === "Preset Colors") {
            return(
                <PresetColors handler={this.handler}/>
            )
        } else if (this.state.tileContents === "Led Off"){
            return(
                func1("off"),
                this.handler()
            )
        } else if (this.state.tileContents === "Alarm"){
            return(
                <Alarm handler={this.handler}/>
            )
        }

    }
}

function tileContent(probs){

    return(
        <div>
            <p>{probs}</p>
        </div>
    )
}


async function tileName_getter(){
    var TileNames=[]
    await fetch('api/tiles').then(res => res.json()).then(data => {
        for (let i = 0; i < Object.values(data)[0].length; i++) {
            TileNames.push(Object.values(data)[0][i])
        }
    })
    return TileNames
}


export async function func1(JSONOb) {
    await fetch("/api/result", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content_type": "application/json",
            },
            body: JSON.stringify({'colors': JSONOb})
        }
    )
}

