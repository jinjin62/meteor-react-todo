import React from "react";
import PropTypes from "prop-types";

const ToDo = ({ todo, toggleComplete, removeTodo }) => (
  <li>
    {todo.title}
    <input
      type="checkbox"
      id={todo._id}
      onChange={() => toggleComplete(todo._id, todo.complete)}
      checked={todo.complete}
    />
    <label htmlFor={todo._id} />
    <button onClick={() => removeTodo(todo._id)}>
      <i className="fa fa-trash" />
    </button>
  </li>
);

ToDo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  }).isRequired
};

export default ToDo;
