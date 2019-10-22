import React from 'react'
import ReactDOM from 'react-dom'
//@ts-ignore
import Message from './Message'
//@ts-ignore
import Post from './Post'

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            messages: [
                {count: 2},
                {count: 3},
                {count: 4},
            ]
        }
    }

    postMessage(newCount: string) {
        const newMessages = this.state.messages.slice()
        newMessages.push({count: newCount})
        this.setState({messages: newMessages})
    }

    render() {
        const messageComponents = this.state.messages.map((message: any, i: any) => {
            return (<Message key={i} count={message.count} />)
        })
        return (
            <div>
                <div>{messageComponents}</div>
                <Post postMessage={(value: string) => this.postMessage(value)} />
            </div>
        )
    }
}

const target = document.getElementById('app')
ReactDOM.render(<App/>, target)