class Message extends React.Component {
    render() {
        return (
            <div>
                <span>🐤</span>
                <span>I have {this.props.count} apples.</span>
            </div>
        )
    }
}