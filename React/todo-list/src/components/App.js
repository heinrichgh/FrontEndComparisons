import React, {Component} from 'react';
import Todo from './Todo/Todo';

class App extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <Todo />
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
