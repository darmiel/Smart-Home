import React from 'react'
import {register} from "./ApiFunctions";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            RPassword: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value,
        });
    }

    async handleSubmit(event) {
        event.preventDefault()
        if (this.state.password === this.state.RPassword) {
            register(this.state.email, this.state.password)
            this.props.handler()
        }

    }

    render() {
        return (
            <section className="h-screen">
                <div className="px-6 h-full text-gray-800">
                    <div
                        className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div
                            className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                 className="w-full" alt="Sample"/>
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form onSubmit={this.handleSubmit}>
                                <div className="mb-6">
                                    <input
                                        name="email"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="FormControlInput1"
                                        placeholder="Email address"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        name="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="FormControlInput2"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        name="RPassword"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="FormControlInput3"
                                        placeholder="Retype Password"
                                        value={this.state.RPassword}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="text-center lg:text-left">
                                    <input
                                        type="submit" value="Register"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                    </input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

