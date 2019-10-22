import React from 'react'

export default class Post extends React.Component<any, any> {
    handlePostEvent(e: any) {
        const input = document.querySelector("#new-message")
        const message = input ? (input as HTMLFormElement).value : ""
        this.props.postMessage(message)
    }

    render() {
        return (
            <div>
                <input id="new-message" type="text" />
                <button onClick={(e: any) => this.handlePostEvent(e)}>post</button>
            </div>
        )
    }
}