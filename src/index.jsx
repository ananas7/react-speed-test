const React = require('react');
const ReactDOM = require('react-dom');
const socket = require('socket.io-client')();
const Main = React.createClass({
    displayName: 'Main',
    getInitialState() {
        return {
            data: false,
        };
    },
    componentDidMount() {
        socket.on("loadDataClient", (data) => {
            this.setState({data: JSON.parse(data)});
        });
    },
    loadData() {
        socket.emit("loadDataServer");
    },
    render() {
        let data;
        if (this.state.data) {
            data = this.state.data.map((elem, index) => <div key={index} className="column fill card">
                <div className="fix pad-item">Логин: {elem.login}</div>
                <div className="fix pad-item">Email: {elem.email}</div>
                <div className="fix pad-item">Пароль: {elem.password}</div>
                <div className="fix pad-item">Средняя оценка: {elem.mark}</div>
            </div>);
        }
        return <div className="column fill align-center pad-item">
            <div className="btn" onClick={this.loadData}>Load data</div>
            <div className="row fill wrap pad-item">
                {data}
            </div>
        </div>;
    }
});

ReactDOM.render(<Main />, document.getElementById('react'));
