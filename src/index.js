/**
 * socketioコンポーネントを定義するJSファイル
 */

// 必要なモジュールを読み込む
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.js';
// WebSocketサーバーへ接続する。
import socketio from 'socket.io-client';
const socket = socketio.connect('http://localhost:3001');

/**
 * 書き込むフォームのコンポーネント
 */
class ChatForm extends React.Component {
    // コンストラクター
    constructor (props) {
        super(props);
        // ステート変数
        this.state = { 
            name: '',
            message: ''
         };
    }
    // 名前が変わった時に処理される関数
    nameChanged (e) {
        this.setState({ name: e.target.value });
    };
    // メッセージが変わった時に処理される関数
    messageChanged (e) {
        this.setState({ message: e.target.value });
    };
    // サーバーに名前とメッセージを送信する関数
    send () {
        socket.emit('chat-msg', {
            name: this.state.name,
            message: this.state.message
        });
        // ステート変数をクリアする。
        this.setState({ message: '' });
    }
    // レンダリングする。
    render () {
        return (
            <div style={styles.form}>
                名前：
                <br />
                <input value={this.state.name} onChange={ e => this.nameChanged(e)} />
                <br />
                メッセージ：
                <br />
                <input value={this.state.message} onChange={ e => this.messageChanged(e)} />
                <br />
                <button onClick={e => this.send()}>送信</button>
            </div>
        )
    }
}

/**
 * メインとなるChatAppコンポーネント
 */


// ChatAppコンポーネントを外部に公開する。
ReactDOM.render(
    <ChatApp />,
    document.getElementById('root')
);

