import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'
import Post from './Post'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [
                {count: 2},
                {count: 3},
                {count: 4},
            ]
        }
    }

    postMessage(newCount) {
        const newMessages = this.state.messages.slice()
        newMessages.push({count: newCount})
        this.setState({messages: newMessages})
    }

    render() {
        const messageComponents = this.state.messages.map((message, i) => {
            return (<Message key={i} count={message.count} />)
        })
        return (
            <div>
                <div>{messageComponents}</div>
                <Post postMessage={(value) => this.postMessage(value)} />
            </div>
        )
    }
}

const target = document.getElementById('app')
ReactDOM.render(<App/>, target)