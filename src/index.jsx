
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [
                "hello word!",
                "I have a pen.",
                "I have an apple."
            ]
        }
    }

    postMessage(message) {
        const newMessages = this.state.messages.slice()
        newMessages.push(message)
        console.log(123)
        this.setState({messages: newMessages})
    }

    render() {
        const messageComponents = this.state.messages.map((message, i)=>{
            return (<Message key={i} text={message}/>)
        })
        return (
            <div>
                {messageComponents}
                <Post postMessage={(value) => this.postMessage(value)}/>
            </div>
        )
    }
}
const target = document.getElementById('app')
ReactDOM.render(<App/>, target)