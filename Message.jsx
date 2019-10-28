class Message extends React.Component {
    render() {
        return (
            <div>
                <span>🐤</span>
                <span>{this.props.text}</span>
            </div>
        )
    }
}