React Step By Step
====

# Step 0: 開発準備

* Node.js
    * https://nodejs.org/ja/
    * https://github.com/nullivex/nodist (Windows)
    * https://github.com/nodenv/nodenv (Mac)
* VSCode
    * https://code.visualstudio.com/
* Live Server (VSCode Extension)
    * https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

VSCodeのEXPLORERから、index.htmlを右クリックして「Open with Live Server」を選択

# Step 1: React.js

* React/ReactDOM
    * CDN
        * https://ja.reactjs.org/docs/cdn-links.html
* 参考
    * https://ja.reactjs.org/docs/add-react-to-a-website.html#step-2-add-the-script-tags
    * https://ja.reactjs.org/docs/react-without-jsx.html

# Step 2: JSX

* JSX(Babelを利用する)
    * CDN
        * https://unpkg.com/browse/babel-standalone@6.26.0/
* React DevTool (Chrome Extension)
    * https://qiita.com/pepo/items/beccd5f1e83ce2b93376

# Step 3: コンポーネントとprops

* コンポーネントに対してプロパティ(props)を渡す（親 => 子 のデータの受け渡し）
    * propsは読み取り専用
* 参考
    * https://ja.reactjs.org/docs/components-and-props.html

# Step 4: 再描画

* Virtual DOMによる差分更新
* リアクティブプログラミング

 => ここなしで

```
messages.push({count:5})
displayApp()
```

# Step 5: イベントとstate

* コンポーネントの内部で扱うデータをstateで管理する
    * コンポーネントクラスのコンストラクタでセットする
    * 値を変更する場合は、this.setState({key: value})を利用する 
* 参考
    * https://ja.reactjs.org/docs/state-and-lifecycle.html
    * https://ja.reactjs.org/docs/handling-events.html

# Step 6: コンポーネント間の連携

* Virtual DOMによる差分更新
* リアクティブプログラミング
* thisの扱いに注意
    * this.handleEvent = this.handleEvent.bind(this)

# Step 7: コンポーネントのライフサイクル

* 参考
    * https://ja.reactjs.org/docs/state-and-lifecycle.html

# Step 8: npm

```
npm init -y
```

* package.json

```
npm install --save-dev @babel/core @babel/cli @babel/preset-react @babel/preset-env
```

https://babeljs.io/docs/en/babel-cli

* package.json
* package-lock.json


```
npx babel --presets @babel/preset-react Message.jsx 
npx babel --presets "@babel/preset-react,@babel/preset-env" Message.jsx
npx babel --presets "@babel/preset-react,@babel/preset-env" Message.jsx -d build

npx babel --presets "@babel/preset-react,@babel/preset-env" index.jsx Post.jsx Message.jsx -d build
```

https://babeljs.io/docs/en/babel-preset-react
* babelのロードが不要になる

# Step 9: webpack

```
npm install --save-dev webpack webpack-cli
```

```
npx babel --presets "@babel/preset-react,@babel/preset-env" src -d build
npx webpack
```

* import './xxxxx'
* export default 

```
npm install --save react react-dom
npx babel --presets "@babel/preset-react,@babel/preset-env" src -d build
npx webpack
```

# Step 10: TypeScript

```
npm install --save-dev typescript
npm install --save-dev @types/react @types/react-dom
npx tsc --jsx react --module commonjs src/index.tsx
```

```
npx tsc --init
npx tsc -p tsconfig.json
```

コンパイルエラーを修正

```
npx tsc -p tsconfig.json
npx babel --presets "@babel/preset-react,@babel/preset-env" compiled -d build
npx webpack
```


