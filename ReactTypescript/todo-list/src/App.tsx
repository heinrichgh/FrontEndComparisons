import React, {Component} from 'react';
import TodoList from './components/TodoList/TodoList';

class App extends Component {
  render() {
    return (
        <div>
          <div className="row justify-content-center">
            <div className="col-4">
              <TodoList />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
