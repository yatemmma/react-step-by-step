import React from 'react'

interface PostProps {
    postMessage(message: string): void
}

export default class Post extends React.Component<PostProps, any> {
    handlePostEvent(e: any) {
        const input: (HTMLFormElement | null) = document.querySelector("#new-message")
        const message = input ? input.value : ""
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