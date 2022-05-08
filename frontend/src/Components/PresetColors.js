import React from "react";

export default class Tiles extends React.Component {
    constructor(props) {
        super(props);
        this.states = {
            newStuff: []
        }

    }

    render() {
        return (
            <button onClick={this.props.handler}>{PresetColorsContent()}</button>
        )
    }
}

export function PresetColorsContent(){
    var content=[]
    content.push(
    <><button
        className="flex-grow aspect-square m-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 text-white">
                        <span
                            className="text-white relative w-24 h-24 inline-flex justify-center items-center bg-darkReader rounded-md group-hover:bg-opacity-0">
                            red
                        </span>
    </button>
</>)
    return content

}