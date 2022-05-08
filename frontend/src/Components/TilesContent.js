import React from 'react';
import PresetColors from './PresetColors'


export default class Tiles extends React.Component {

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this)
        this.state= {
            tiles: [],
            showTiles: true,
            tileContents: []


        }
    }

    handler(){
        this.setState({
            tileContents : []
        })
    }


    componentDidMount(){
        var dict = {}
        for (let i = 0; i < this.props.tileNames.length; i++) {
            this.setState({tileContents: dict})
            this.state.tiles.push(
                <>
                    <button
                        onClick={() => {this.setState({tileContents: this.props.tileNames[i]})}} className="flex-grow aspect-square m-4 relative items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 text-white">
                        <span key={"hallo" + [i]}
                              className="text-white relative w-24 h-24 inline-flex justify-center items-center bg-darkReader rounded-md group-hover:bg-opacity-0">
                         {tileContent(this.props.tileNames[i])}
                        </span>
                    </button>
                </>
            )
        }
    }



    render() {
        //this.createTiles()
        if (this.state.tileContents !== "PresetColors"){
            return (
                <div>
                    {this.state.tiles}
                </div>
            )
        } else {
            return(
                <PresetColors handler={this.handler}/>
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

