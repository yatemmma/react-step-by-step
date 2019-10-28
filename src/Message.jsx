import React from 'react'

export default class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            liked: false,
            icon: "🐤"
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({icon: "🐓"})
        }, 100 * this.props.text.length)
    }

    toggleLiked() {
        this.setState({liked: !this.state.liked})
    }

    render() {
        return (
            <div>
                <span>{this.state.icon}</span>
                <span>{this.props.text}</span>
                <a href="#"
                   onClick={() => {this.toggleLiked()}}
                    >
                    {this.state.liked ? "❤️" : "♡"}
                </a>
            </div>
        )
    }
}