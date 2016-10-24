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
            data = this.state.data.map((elem, index) => React.createElement("div", {key: index, className: "column fill card"}, 
                React.createElement("div", {className: "fix pad-item"}, "Логин: ", elem.login), 
                React.createElement("div", {className: "fix pad-item"}, "Email: ", elem.email), 
                React.createElement("div", {className: "fix pad-item"}, "Пароль: ", elem.password), 
                React.createElement("div", {className: "fix pad-item"}, "Средняя оценка: ", elem.mark)
            ));
        }
        return React.createElement("div", {className: "column fill align-center pad-item"}, 
            React.createElement("div", {className: "btn", onClick: this.loadData}, "Load data"), 
            React.createElement("div", {className: "row fill wrap pad-item"}, 
                data
            )
        );
    }
});

ReactDOM.render(React.createElement(Main, null), document.getElementById('react'));