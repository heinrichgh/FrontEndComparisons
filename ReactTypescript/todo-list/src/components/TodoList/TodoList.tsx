import React from 'react';
import TodoItem, {TodoItemState} from "./TodoListItem";

interface TodoListState {
    text: string,
    items: TodoItemState[]
}

class TodoList extends React.Component<{}, TodoListState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            text: "",
            items: []
        };

        this.addItem = this.addItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.markItemDone = this.markItemDone.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Todo List</h1>
                <div className="input-group mb-3">
                    <input type="text"
                           className="form-control"
                           placeholder="Todo Item"
                           aria-label="Todo Item"
                           aria-describedby="basic-addon2"
                           onChange={this.handleChange}
                           value={this.state.text}
                           onKeyPress={this.checkEnter}
                    />
                    <div className="input-group-append">
                        <button onClick={this.addItem} className="btn btn-outline-primary" type="button">Button</button>
                    </div>
                </div>
                <div>
                    {this.state.items.map((item, index) => <TodoItem key={index} index={index} item={item}
                                                                     done={this.markItemDone}
                                                                     remove={this.removeItem}/>)}
                </div>
            </div>
        )
    }

    private handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        this.setState({...this.state, text: e.target.value});
    }

    private checkEnter(e : React.KeyboardEvent) {
        if (e.key === 'Enter')
        {
            this.addItem();
        }
    }

    private addItem() {
        const item = {
            label: this.state.text,
            done: false,
            dateAdded: new Date()
        };
        this.setState({...this.state, items: [...this.state.items, item], text: ""});
    }

    private markItemDone(index: number) {
        this.setState(
            {...this.state,
                items: [
                    ...this.state.items.slice(0, index),
                    {
                        ...this.state.items[index]
                        , done: true
                    },
                    ...this.state.items.slice(index + 1)
                ]
            }
        );
    }

    private removeItem(index: number) {
        this.setState(
            {...this.state,
                items: [
                    ...this.state.items.slice(0, index),
                    ...this.state.items.slice(index + 1)
                ]
            }
        );
    }
}

export default TodoList;