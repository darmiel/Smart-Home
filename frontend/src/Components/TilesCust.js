import React from 'react';
import {news_getter} from '../RSS'
import '../index.css'

export default class TilesCust extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
            keys: [],
			items: [],
            link: [],
            title: []

		};
	}

    async componentDidMount(){
        const news = await news_getter()

        this.state.items.push(Object.values(news))
        this.state.keys.push(Object.keys(news))
        if (this.state.title.length === 0) {
            for (let i = 0; i < 10; i++) { //max 40
                this.state.title.push(<a href={this.state.items[0][i]} target="_blank" type="button"
                                              className="m-4 mr-12 ml-8 w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{this.state.keys[0][i]}</a>)
            }
        }
        this.state.isLoaded = true	//when all repos descriptions are gathered tell app it's loaded
		this.setState({
			isLoaded: true
		});
    }



    render() {
        const tiles = []
        for (let i = 0; i < 8; i++) {
            tiles.push(
                <>
                    <button
                        className="flex-grow aspect-square m-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                        <span
                            className="relative w-full h-full p-12 inline-flex justify-center items-center transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            🤖
                        </span>
                    </button>
                </>
            )
        }

        const { isLoaded } = this.state;

        if (!isLoaded){
            return <div>Loading . . . </div>
        } else {

                return (
                    <div className="flex flex-row">
                        <div className="flex-row flex-grow flex-wrap md:w-6/12">
                            {tiles}
                        </div>
                        <div className="flex flex-row flex-grow flex-wrap md:w-6/12 sm:hidden">
                            {this.state.title}
                        </div>
                    </div>)
        }

    }
}
