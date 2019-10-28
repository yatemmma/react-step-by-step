React Step By Step
====

# Step 0: 開発準備

* 以下をインストールします
    * Node.js（できるだけ最新版）
        * https://nodejs.org/ja/
        * 複数バージョンを使い分ける場合は以下がオススメ
            * https://github.com/nullivex/nodist (Windows)
            * https://github.com/nodenv/nodenv (Mac)
    * VSCode
        * https://code.visualstudio.com/
    * VSCodeの拡張機能
        * Live Server
            * https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
            * VSCodeのEXPLORERから、index.htmlを右クリックして「Open with Live Server」を選択

# Step 1: React.js

* ```<div id="app">hello!</div>``` 部分をReactで書き換えるため、index.htmlに以下を追加します（body閉じタグの直前）

```
<script>
    class App extends React.Component {
        render() {
            return React.createElement('div', null, 'hello react!')
        }
    }
    const target = document.getElementById('app')
    ReactDOM.render(React.createElement(App), target)
</script>
```

* ブラウザ上でReactを利用可能にするため、さらに以下を追加します（上記script要素の直前）

```
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
```

* React/ReactDOM
    * https://ja.reactjs.org/
* CDN
    * https://ja.reactjs.org/docs/cdn-links.html
* チュートリアル
    * https://ja.reactjs.org/docs/add-react-to-a-website.html#step-2-add-the-script-tags
    * https://ja.reactjs.org/docs/react-without-jsx.html

# Step 2: JSX

* React.createElementの部分をHTMLで記載できるようにするため、index.htmlの該当部分を書き換えます

```
render() {
    return React.createElement('div', null, 'hello react!')
}
↓
render() {
    return (<div>hello JSX!</div>)
}
```

```
ReactDOM.render(React.createElement(App), target)
↓
ReactDOM.render(<App/>, target)
```

* ブラウザ上でReactを利用可能にするため、さらに以下を追加します

```
<script src="https://unpkg.com/babel-standalone@6.26.0/babel.js" crossorigin></script>
```

* JSXを利用しているscript要素を変換対象とするため、scriptタグにtype属性を設定します

```
<script type="text/babel">
…
</script>
```

* JSX
    * https://ja.reactjs.org/docs/introducing-jsx.html
    * https://ja.reactjs.org/docs/jsx-in-depth.html
* CDN
    * https://unpkg.com/browse/babel-standalone@6.26.0/
* Chrome Extensionをインストールしましょう
    * React DevTool
        * https://qiita.com/pepo/items/beccd5f1e83ce2b93376

# Step 3: Reactのコンポーネントとprops

* メッセージ部分を拡張するため、コンポーネントとして切り出します。Message.jsx というファイルを新規に作成します。

```
class Message extends React.Component {
    render() {
        return (<div>hello JSX!</div>)
    }
}
```

* index.htmlのAppからMessageを参照します

```
<script type="text/babel" src="Message.jsx"></script>
```

```
render() {
    return (<div>hello JSX!</div>)
↓
return (<Message/>)
```

* Message.jsxの構成を変更します。表示文字列はpropsを使い、親から受け取るようにします
    * returnする要素は1つである必要があるため、任意のタグで囲います

```
return (<div>hello JSX!</div>)
↓
return (
    <div>
        <span>🐤</span>
        <span>{this.props.text}</span>
    </div>
)
```

* index.htmlを修正します。コンポーネントを複数設置してみましょう

```
return (<Message/>)
↓
return (
    <div>
        <Message text="hello word!"/>
        <Message text="I have an apple."/>
    </div>
)
```

# Step 4: Reactのイベントとstate

* メッセージの隣にいいねボタンを設置します
    * Messageクラスに以下のコンストラクタを追加します

```
constructor(props) {
    super(props)
    this.state = {
        liked: false
    }
}
```

* MessageクラスのJSXにいいねボタンを設置します

```
return (
    <div>
        <span>🐤</span>
        <span>{this.props.text}</span>
        <a href="#">
            {this.state.liked ? "❤️" : "♡"}
        </a>
    </div>
)
```

* いいねボタンにクリックイベントを追加します

```
<a href="#"
    onClick={() => {this.toggleLiked()}}
    >
    {this.state.liked ? "❤️" : "♡"}
</a>
```

* Messageクラスに、いいねを切り替えるメソッドを追加します

```
toggleLiked() {
    this.setState({liked: !this.state.liked})
}
```

# Step 5: コンポーネント間の連携

* メッセージを可変にするため、親コンポーネントとなるAppクラスにメッセージをstateとして持たせます

```
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
```

```
render() {
    return (
        <div>
            <Message text="hello word!"/>
            <Message text="I have an apple."/>
        </div>
    )
}
↓
render() {
    const messageComponents = this.state.messages.map((message, i)=>{
        return (<Message key={i} text={message}/>)
    })
    return (
        <div>
            {messageComponents}
        </div>
    )
}
```

* 新しいメッセージを投稿するPost.jsxを作成します

```
class Post extends React.Component {
    handlePostEvent() {
        const message = document.querySelector("#new-message").value
        console.log(message)
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
```

* Appクラスから読み込みます

```
<script type="text/babel" src="Post.jsx"></script>
```

```
return (
    <div>
        {messageComponents}
    </div>
)
↓
return (
    <div>
        {messageComponents}
        <Post/>
    </div>
)
```

* 親クラスであるAppクラスに、Postコンポーネントでボタンクリックが発生した際の処理を定義します。

```
postMessage(message) {
    const newMessages = this.state.messages.slice()
    newMessages.push(message)
    this.setState({messages: newMessages})
}
```

* メソッドをプロパティとしてPostコンポーネントに渡します

```
<Post/>
↓
<Post postMessage={(value) => this.postMessage(value)}/>
```

* Postコンポーネントから呼び出します

```
handlePostEvent() {
    const message = document.querySelector("#new-message").value
    console.log(message)
}
↓
handlePostEvent() {
    const message = document.querySelector("#new-message").value
    this.props.postMessage(message)
}
```

* データをもとにViewが生成される
    * リアクティブプログラミング
    * VirtualDOMによる差分更新
* thisの取り扱いに注意
    * https://ja.reactjs.org/docs/faq-functions.html

# Step 6: Reactコンポーネントのライフサイクル

* Messageクラスにコンポーネントが生成された際に呼ばれる処理を追加します

```
constructor(props) {
    super(props)
    this.state = {
        liked: false
    }
}
↓
constructor(props) {
    super(props)
    this.state = {
        liked: false,
        icon: "🐤"
    }
}
```

```
<span>🐤</span>
↓
<span>{this.state.icon}</span>
```

```
componentDidMount() {
    setInterval(() => {
        this.setState({icon: "🐓"})
    }, 100 * this.props.text.length)
}
```

* チュートリアル
    * https://ja.reactjs.org/docs/state-and-lifecycle.html
