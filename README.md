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