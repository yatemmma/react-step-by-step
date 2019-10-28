import React from 'react'

interface PostProps {
    postMessage(message: string): void
}

export default class Post extends React.Component<PostProps, any> {
    handlePostEvent() {
        const inputComponent: (HTMLFormElement | null) = document.querySelector("#new-message")
        const message = inputComponent ? inputComponent.value : ""
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