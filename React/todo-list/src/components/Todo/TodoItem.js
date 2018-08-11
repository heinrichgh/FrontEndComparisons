import React, {Component} from 'react';

class TodoItem extends Component {

    render() {
        return (
            <li className={"list-group-item " + (this.props.item.done ? "list-group-item-success" : "")}>
                <div>
                    {this.props.item.label}

                    <div className="float-right">
                        {!this.props.item.done ? <button className="btn btn-sm btn-outline-success" onClick={this.props.done} data-index={this.props.index}>Done</button> : "" }
                        &nbsp;
                        <button className="btn btn-sm btn-outline-danger" data-index={this.props.index} onClick={this.props.remove}>&times;</button>
                    </div>
                </div>
                <div className="text-muted small">
                    {this.props.item.dateAdded.toLocaleDateString(window.navigator.language)} {this.props.item.dateAdded.getHours()}:{this.props.item.dateAdded.getMinutes()}
                </div>
            </li>
        )
    }
}

export default TodoItem;