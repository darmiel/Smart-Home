import React from 'react';
import {news_getter} from './RSS'
import Tiles from './TilesContent'
import '../index.css'

export default class TilesCust extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
            title: [],
            tileNames: [],
            showTiles: true

		};
	}


    async componentDidMount(){

        const news = await news_getter()

        if (this.state.title.length === 0) {
            for (let i = 0; i < 10; i++) { //max 40
                this.state.title.push(<a key={Object.values(news)[i]} href={Object.values(news)[i]} target="_blank" type="button"
                                              className="bg-darkReader text-white m-4 mr-12 ml-8 w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border border-gray-200 focus:ring-gray-700 hover:bg-gray-700" rel="noreferrer">{Object.keys(news)[i]}</a>)
            }
        }
        this.state.isLoaded = true	//when all repos descriptions are gathered tell app it's loaded
		this.setState({
			isLoaded: true
		});
    }


    render() {

        const { isLoaded } = this.state;

        if (!isLoaded){
            return <div>Loading . . . </div>
        } else if (this.state.showTiles) {

                return (
                    <div className="flex flex-row">
                        <div className="flex-row flex-grow flex-wrap md:w-6/12">
                            <Tiles/>
                        </div>
                        <div className="flex flex-row flex-grow flex-wrap md:w-6/12 sm:hidden">
                            {this.state.title}
                        </div>
                    </div>)
        } else if (!this.state.showTiles){
            return(
                <p className="text-white">LOL</p>
            )
        }

    }
}

