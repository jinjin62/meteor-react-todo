import React, { Component } from "react";

class ToDoInput extends Component {
  constructor(props) {
    super(props);

    this.toDoInput = React.createRef();
  }

  componentDidMount() {
    this.toDoInput.current.focus();
  }
  render() {
    const { onSubmit } = this.props;
    return (
      <div className="add-todo">
        <form
          name="addTodo"
          onSubmit={event => onSubmit(this.toDoInput, event)}
        >
          <input type="text" ref={this.toDoInput} />
          <span>(press enter to add)</span>
        </form>
      </div>
    );
  }
}

export default ToDoInput;
