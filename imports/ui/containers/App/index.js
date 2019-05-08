import React, { Component } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import ToDoCount from "../../ToDoCount/ToDoCount";
import ClearButton from "../../ClearButton/ClearButton";
import ToDo from "../../ToDoItem/ToDoItem";
import ToDoInput from "../../ToDoInput/ToDoInput";
import AccountsUIWrapper from "../../components/AccountsWrapper/index";
import { ToDos as ToDoDB } from "../../../api/todo";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

// presentation component (statelss)
const Header = props => <h1>{props.children}</h1>;

// class component
class App extends Component {
  constructor(props) {
    super(props);
  }

  toggleComplete = (id, complete) => {
    ToDoDB.update(id, { $set: { complete: !complete } });
  };

  removeTodo = id => {
    ToDoDB.remove(id);
  };

  removeCompleted = () => {
    const todosCompleted = this.props.todos
      .filter(todo => todo.complete)
      .map(t => t._id);
    todosCompleted.forEach(id => ToDoDB.remove(id));
  };

  hasCompleted = () => {
    const completedTodos = this.props.todos.filter(todo => todo.complete);
    return completedTodos.length;
  };

  addToDo = (input, event) => {
    event.preventDefault();
    const toDoInput = input.current;
    if (toDoInput.value) {
      ToDoDB.insert({
        title: toDoInput.value,
        complete: false,
        own: this.props.currentUserId
      });
      toDoInput.value = "";
    }
  };

  static defaultProps = { todos: [] };

  render() {
    // const { todos } = this.state;
    const { todos, currentUser } = this.props;
    console.log(this.props.currentUser);
    console.log(this.props.currentUserId);
    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsUIWrapper />
        </div>
        {currentUser ? (
          <div className="todo-list">
            <Header>
              {todos.length === 0 ? "Nothing To Do" : "So Much To Do"}
            </Header>

            <ToDoInput onSubmit={this.addToDo} />

            <ul>
              {todos.length > 0 &&
                todos.map(todo => (
                  <ToDo
                    key={todo._id}
                    todo={todo}
                    toggleComplete={this.toggleComplete}
                    removeTodo={this.removeTodo}
                  />
                ))}
            </ul>
            <div className="todo-admin">
              <ToDoCount number={todos.length} />
              {this.hasCompleted() ? (
                <ClearButton removeCompleted={this.removeCompleted} />
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className="logged-out-message">
            <p>Please sign in to see your todos.</p>
          </div>
        )}
      </div>
    );
  }
}
export default withTracker(() => {
  const currentUserId = Meteor.userId();
  return {
    currentUser: Meteor.user(),
    currentUserId,
    todos: currentUserId ? ToDoDB.find({ own: currentUserId }).fetch() : []
  };
})(App);
