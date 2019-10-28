class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            liked: false
        }
    }

    toggleLiked() {
        this.setState({liked: !this.state.liked})
    }

    render() {
        return (
            <div>
                <span>🐤</span>
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