import React from 'react'

export default class Post extends React.Component {
    handlePostEvent(e) {
        const message = document.querySelector("#new-message").value
        this.props.postMessage(message)
    }

    render() {
        return (
            <div>
                <input id="new-message" type="text" />
                <button onClick={() => this.handlePostEvent()}>post</button>
            </div>
        )
    }
}