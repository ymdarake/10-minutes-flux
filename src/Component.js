import React from "react"
import ActionCreator from "./ActionCreator"
import Store from "./Store"
import EventEmitter from "./EventEmitter"

//component -> action -> dispatcher -> store (-> dispatcher) -> component
//-- action.countUp(data)
//-> dispatcher.emit("countUp", data)
//-> store.onCountUp(data)
//-> store.emit("CHANGE")
const dispatcher = new EventEmitter();
const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);

export default class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: store.getCount()};
        store.on("CHANGE", () => {
            this._onChange();
        })
    }
    _onChange() {
        this.setState({count: store.getCount()});
    }
    tick() {
        console.trace();
        action.countUp(this.state.count + 1);
    }
    render() {
        return (
            <div>
                <button onClick={this.tick.bind(this)}>Count Up</button>
                <p>
                    Count: {this.state.count}
                </p>
            </div>
        );
    }
}