import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'
import Post from './Post'

export class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            messages: [
                "hello word!",
                "I have a pen.",
                "I have an apple.",
                "I love TypeScript."
            ]
        }
    }

    postMessage(message: string) {
        const newMessages = this.state.messages.slice()
        newMessages.push(message)
        console.log(123)
        this.setState({messages: newMessages})
    }

    render() {
        const messageComponents = this.state.messages.map((message: string, i: number)=>{
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