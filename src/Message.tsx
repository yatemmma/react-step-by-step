import React from 'react'
//@ts-ignore
import styled, { StyledComponent } from 'styled-components'

export default class Message extends React.Component<any, any> {
    constructor(props: any) {
        console.log(props)
        super(props)
        this.state = {
            liked: false,
            icon: "🐤"
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({icon: "🐓"})
        }, 1000 * this.props.count)
    }

    render() {
        return (
            <div>
                <Icon>{this.state.icon}</Icon>
                <span>I have {this.props.count} apples.</span>
                <Like liked={this.state.liked} href="#" onClick={() => {this.setState({liked: !this.state.liked})}}>{this.state.liked ? "❤️" : "♡"}</Like>
            </div>
        )
    }
}

const Icon = styled.span`
    margin: auto 4px;
`
const Like: StyledComponent<'a', any, {liked: boolean}> = styled.a`
    margin: auto 4px;

    text-decoration: ${(props: any) => (props.liked ? "none" : "underline")};
`