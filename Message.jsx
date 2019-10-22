class Message extends React.Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            liked: false,
            icon: "🐤"
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({icon: "🐓"})
        }, 1000 * this.props.count)
    }

    render() {
        return (
            <div>
                <span>{this.state.icon}</span>
                <span>I have {this.props.count} apples.</span>
                <a href="#" onClick={() => {this.setState({liked: !this.state.liked})}}>{this.state.liked ? "❤️" : "♡"}</a>
            </div>
        )
    }
}