import React, { Component } from 'react';
import  Item from './Item';
import './App.css';

class App extends Component {
  state = {
    todos: [
      { id: 1, text: "create todo list", done: true, isVisible: true },
      { id: 2, text: "deploy todo list", done: true, isVisible: true },
      { id: 3, text: "send", done: false, isVisible: true }
    ],
    filterBy:'',
    newItemText: '',
    checkAll: false
  };

  onNewItemTextChange = text => {
    this.setState({
      newItemText: text
    });
  };

  onItemAdded = (event) => {
    event.preventDefault();
    if ("" === this.state.newItemText) {
      return;
    }
    this.setState(({todos, newItemText}) => {
      const newTodo = {
        id: +(new Date()),
        text: newItemText,
        done: false,
        isVisible: true
      };
      return {
        todos: [...todos, newTodo],
        newItemText: ""
      };
    })
  };

  onCheckedChange(index) {
    this.setState((prevState) => {
      let newTodos = prevState.todos;
      newTodos.map((todo) => {
        if (todo.id === index) {
          todo.done = !todo.done;
        }
      });
      return {
        todos: newTodos
      }
    })
  };

  onAllItemsCheck() {
    this.setState((prewState)=>{
      const newCheckAll = !prewState.checkAll;
      const newTodos = prewState.todos.map(todo => ({...todo, done: newCheckAll}));
      return {
        todos : newTodos,
        checkAll : newCheckAll
      }
    });
  };

  onDeleteItem(index) {
    this.setState((prevState) => {
      const todos = prevState.todos.filter(item => item.id !== index);
       return {
        todos
      };
    });
  };

  onButtonClick(typeButton) {
    this.setState({filterBy: typeButton})
  };

  onButtonCleanDone() {
    this.setState((prevState) => {
      const todos = prevState.todos.filter(item => !item.done);
      return {
        todos
      };
    });
  };


  filterTodos() {
    const {todos, filterBy} = this.state;
    switch (filterBy) {
      case 'showDone': return todos.filter(todo => todo.done);
      case 'showActive': return todos.filter(todo => !todo.done);
      default: return todos;
    }
  };

  render() {
    const state =  this.filterTodos();
    return (
        <div className="Todo">
          <h2 className="Todo__title">My Todo</h2>
          <form onSubmit={this.onItemAdded}>
           <div className="input-group mb-3">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input
                    type="checkbox"
                    name="chackAll"
                    checked={this.state.checkAll}
                    onChange={() => this.onAllItemsCheck()}
                    />
              </div>
            </div>
            <input
                type="text"
                className="form-control"
                value={this.state.newItemText}
                onChange={event => {
                  this.onNewItemTextChange(event.target.value);
                }}
            />
          </div>
          </form>
            <ul className="list-group">
            {state.map(todo => (
                 <Item
                    key={todo.id}
                    value={todo.id}
                    checked={todo.done}
                    onChange={() => this.onCheckedChange(todo.id)}
                    onDelete={() => this.onDeleteItem(todo.id)}
                >
                  {todo.text}
                </Item>
            ))}
          </ul>
          <br />
          <button
              className="btn btn-secondary"
              onClick={() => this.onButtonClick('showAll')}
          >
            All
          </button>
          <button
              className="btn btn-secondary"
              onClick={() => this.onButtonClick('showDone')}
          >
            Done
          </button>
          <button
              className="btn btn-secondary"
              onClick={() => this.onButtonClick('showActive')}
          >
            Active
          </button>
          <button
              className="btn btn-secondary"
              onClick={() => this.onButtonCleanDone()}
          >
            Clear done
          </button>
          <br />
          <h2>{state.length} has left</h2>
        </div>
    );
  }
}


export default App;
