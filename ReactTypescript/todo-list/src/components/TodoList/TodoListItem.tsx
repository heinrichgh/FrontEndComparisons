import React, {Component} from 'react';

export  interface TodoItemState {
    done: boolean,
    label: string,
    dateAdded: Date
}

interface TodoItemProps {
    item : TodoItemState,
    done: (index: number) => void,
    remove: (index: number) => void,
    index: number
}

class TodoItem extends Component<TodoItemProps, {}> {

    render() {
        return (
            <div className={"list-group-item " + (this.props.item.done ? "list-group-item-success" : "")}>
                <div>
                    {this.props.item.label}

                    <div className="float-right">
                        {!this.props.item.done ? <button className="btn btn-sm btn-outline-success" onClick={() => this.props.done(this.props.index)}>Done</button> : "" }
                        &nbsp;
                        <button className="btn btn-sm btn-outline-danger" onClick={() => this.props.remove(this.props.index)}>&times;</button>
                    </div>
                </div>
                <div className="text-muted small">
                    {this.props.item.dateAdded.toLocaleDateString(window.navigator.language)} {this.props.item.dateAdded.getHours()}:{this.props.item.dateAdded.getMinutes()}
                </div>
            </div>
        )
    }
}

export default TodoItem;