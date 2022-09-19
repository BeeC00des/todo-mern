import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input';
import ListTodo from './listtodo';


class Todo extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    const URL = process.env.REACT_APP_BASEURL;
    // console.log(URL);
    axios.get(URL)
      .then((res) => {
        if (res.data) {
          this.setState({
            todos: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteTodo = (id) => {
    const URL = process.env.REACT_APP_BASEURL;
    const base = URL + id;
    axios.delete(base)
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    let { todos } = this.state;

    return (
      <div>
        <h1>My Todo(s)</h1>
        <Input getTodos={this.getTodos} />
        <ListTodo todos={todos} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
  
}

export default Todo;