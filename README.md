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

# Step 7: npm

コンソールで以下を実行すると、package.jsonというファイルが生成されます。

```
npm init -y
```

* 以下の内容に書き換えておきます

```
{
  "name": "react-step-by-step",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

* これまでブラウザ上でロードしていたJSXの変換を、Node.jsで事前に変換するようにします
    * 必要なライブラリをインストールします
    * 自動でpackage.jsonが書き換えられます

```
npm install --save-dev @babel/core @babel/cli @babel/preset-react @babel/preset-env
```

* 以下のコマンドを実行してみましょう
    * JSXが変換されたプログラムが表示されるはずです

```
npx babel --presets @babel/preset-react Message.jsx
```

* 以下のコマンドを実行してみましょう
    * JSXの変換に加え、ES6のコードが変換されていることが分かります

```
npx babel --presets "@babel/preset-react,@babel/preset-env" Message.jsx
```

* 複数ファイルを指定できるよう、jsxファイルをsrcフォルダに移動し、以下のコマンドでビルドできるようにしましょう

```
npx babel --presets "@babel/preset-react,@babel/preset-env" src -d build
```

* index.htmlのスクリプトも外出しし、srcフォルダにindex.jsxとして配置します

```

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
```

```
<body>
  <div id="app">hello!</div>

  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js" crossorigin></script>

  <script type="text/babel" src="Message.jsx"></script>
  <script type="text/babel" src="Post.jsx"></script>
  <script type="text/babel" src="index.jsx"></script>
</body>
```

* また、コマンドラインで変換後のファイルを読みに行くように変更します
    * ブラウザ上での変換が不要になるので、babelのCDNからのロードを削除します
    * 読み込むファイルがjsx⇒jsになります
    * type属性が不要になります

```
<body>
  <div id="app">hello!</div>

  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  <script src="build/Message.js"></script>
  <script src="build/Post.js"></script>
  <script src="build/index.js"></script>
</body>
```

# Step 8: webpack

* webpackをインストールします

```
npm install --save-dev webpack webpack-cli
```

* webpack.config.js という設定ファイルを新規作成します

```
const path = require('path')

module.exports = {
  entry: './build/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

* html上で行っているreactのロードをwebpackで行うようにします
    * また、複数のファイルを一つにまとめるため、読み込むファイルを変更します

```
<body>
  <div id="app">hello!</div>
  <script src="dist/main.js"></script>
</body>
```

* npmでreactのライブラリをインストールします

```
npm install --save react react-dom
```

* index.jsxの冒頭に、ライブラリ・別ファイルのimportを追加します

```
import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'
import Post from './Post'
```

* Message.jsx、Post.jsxを以下のように変更します
    * reactのimportを追加
    * class定義にexport defaultを追加

```
import React from 'react'
```

```
class Message extends React.Component {
↓
export default class Message extends React.Component {
```

* ビルドします

```
npx babel --presets "@babel/preset-react,@babel/preset-env" src -d build
npx webpack
```

# Step 9: TypeScript

* TypeScriptをインストールします。React関連のTypeScript用ライブラリも合わせてインストールします

```
npm install --save-dev typescript @types/react @types/react-dom
```

* tsconfig.json という設定ファイルを作成します
    * ```npx tsc --init``` で自動生成することもできます

```
{
    "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "lib": ["es6","dom"],
      "jsx": "react",
      "outDir": "./build",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true
    }
}
```

* srcフォルダのjsxファイルを、tsxという拡張子に変更し、ビルドします
    * エラーがたくさん出ます

```
npx tsc
```

* TypeScript
    * 参考
        * TypeScript入門 – 基本の型を学ぶ
            * https://dev.classmethod.jp/client-side/javascript/lean-typescript-basic-types/
        * TypeScriptの型入門
            * https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a
        * がんばらないTypeScript
            * https://employment.en-japan.com/engineerhub/entry/2019/04/16/103000
        * Typescriptのinterfaceの使い方
            * https://qiita.com/nogson/items/86b47ee6947f505f6a7b

* Post.tsxのエラーを直します
    * document.querySelectorの結果がnullの可能性もあるよというエラー

```
const message = document.querySelector("#new-message").value
↓
const inputComponent: (HTMLFormElement | null) = document.querySelector("#new-message")
const message = inputComponent ? inputComponent.value : ""
```


* postMessageが含まれるpropsの型定義ちゃんとしてねというエラー
    * interface定義を追加

```
interface PostProps {
    postMessage(message: string): void
}
```

```
export default class Post extends React.Component {
↓    
export default class Post extends React.Component<PostProps, any> {
```

* Message.tsxのエラー
    * anyでコンパイルエラーは解消できますが、TypeScriptのメリットを享受できません。プロジェクトのルールに従って適切な定義を行いましょう

```
export default class Message extends React.Component {
↓
export default class Message extends React.Component<any, any> {
```

```
constructor(props) {
↓
constructor(props: any) {
```

* index.tsxのエラー

```
postMessage(message) {
↓
postMessage(message: string) {
```

```
const messageComponents = this.state.messages.map((message, i)=>{
    return (<Message key={i} text={message}/>)
})
↓
const messageComponents = this.state.messages.map((message: string, i: number)=>{
    return (<Message key={i} text={message}/>)
})
```

* エラーが解消されたらwebpackと一緒にビルドします
    * JSXの変換はtscが内包しているため、実行不要です

```
npx tsc
npx webpack
```

* index.tsxを修正し、変更が反映されることを確認しましょう

```
messages: [
    "hello word!",
    "I have a pen.",
    "I have an apple."
]
↓
messages: [
    "hello word!",
    "I have a pen.",
    "I have an apple.",
    "I love TypeScript."
]
```

# step 10: webpackで全部やる (ts-loader)

* すべての変換処理をwebpackでやってしまいます
    * ts-loaderというwebpackのプラグインをインストールします 

```
npm install --save-dev ts-loader
```

* webpack.config.js を以下のように修正します
    * entryをsrc配下にします
    * moduleにts-loaderを追加
    * resolveを追加

```
const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
}
```

* webpackのみでTypeScriptの変換までできるようになりました

```
npx webpack
```

* --watchオプションをつけると、ファイルの変更を監視して自動で変換をかけてくれます

```
npx webpack --watch
```

* package.jsonのscriptsに追加しておきます
    * scriptsの定義ではnpxコマンドは不要です

```
  "scripts": {
    "build": "webpack",
    "build:watch": "webpack --watch",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

* 以下で実行できるようになります

```
npm run build
npm run build:watch
```

# Step 11: Jest

* jestと、Reactコンポーネントをテストするenzymeをインストールします

```
npm install --save-dev jest ts-jest @types/jest
npm install --save-dev enzyme @types/enzyme enzyme-to-json enzyme-adapter-react-16 @types/enzyme-adapter-react-16
```

* jest.config.jsという設定ファイルを新規作成します

```
module.exports = {
    "roots": [
        "<rootDir>/src",
        "<rootDir>/tests",
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts", "tsx", "js", "jsx"
    ],
    "snapshotSerializers": ["enzyme-to-json/serializer"],
}
```

* package.jsonを変更します

```
"scripts": {
    "build": "webpack",
    "build:watch": "webpack --watch",
    "test": "echo \"Error: no test specified\" && exit 1"
},
↓
"scripts": {
    "build": "webpack",
    "build:watch": "webpack --watch",
    "test": "jest"
},
```

* testsというフォルダを作り、Post.test.tsxというファイルを新規作成します

```
import * as React from 'react'
import { shallow, configure } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
configure({ adapter: new EnzymeAdapter() })
import Post from '../src/Post'

test('call postMessage with text after click button', () => {
    const postMessageSpy = jest.fn()
    
    const component = mount(
        <Post postMessage={postMessageSpy} />,
        { attachTo: document.body.appendChild(document.createElement('div')) }
    )
    component.find('input').getDOMNode().setAttribute('value', 'hoge')
    component.find('button').simulate('click')

    expect(postMessageSpy).toHaveBeenCalledWith('hoge')
})
```

* テスト実行

```
npm run test
```

* 参考
    * https://basarat.gitbooks.io/typescript/docs/testing/jest.html

