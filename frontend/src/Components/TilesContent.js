import React from 'react';
import PresetColors from './PresetColors'
import Alarm from './Alarm'


export default class Tiles extends React.Component {

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this)
        this.state = {
            tiles: [],
            showTiles: true,
            tileContents: [],
            isLoaded: false,
        }
    }

    handler() {
        this.setState({
            tileContents: [],

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
                              className="text-white relative w-32 h-32 inline-flex justify-center items-center bg-darkReader rounded-md group-hover:bg-opacity-0">
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
        if (!this.state.isLoaded) {
            return (
                <>
                    <p>Loading</p>
                </>
            )
        }
        if (this.state.tileContents.length === 0) {
            return (
                <>
                    <button>{this.state.tiles}</button>

                </>
            )
        } else if (this.state.tileContents === "Preset Colors") {
            return (
                <PresetColors handler={this.handler}/>
            )
        } else if (this.state.tileContents === "Led Off") {
            sendToApi("off")
            return (
                <>
                    <button>{this.state.tiles}</button>
                </>
            )
        } else if (this.state.tileContents === "Alarm") {
            return (
                <Alarm handler={this.handler}/>
            )
        }

    }
}

function tileContent(probs) {
    return (
        <div>
            <p>{probs}</p>
        </div>
    )
}


async function tileName_getter() {
    const TileNames = [];
    const res = await fetch('api/tiles')
    const json = await res.json()
    for (let i = 0; i < Object.values(json)[0].length; i++) {
        TileNames.push(Object.values(json)[0][i])
    }
    return TileNames
}


export async function sendToApi(JSONOb) {
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


