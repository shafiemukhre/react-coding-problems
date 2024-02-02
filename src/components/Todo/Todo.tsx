import { useState } from "react";

// array of objects with key id and label
let id = 0;
const todoItemsInitial = [
  { id: id++, label: "Walk the dog" },
  { id: id++, label: "Water the plants" },
  { id: id++, label: "Wash the dishes" },
];

export default function Todo() {
  const [todoItem, setTodoItem] = useState("");
  const [todoItems, setTodoItems] = useState(todoItemsInitial);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItem(event.target.value);
  };

  const onClick = () => {
    setTodoItems(todoItems.concat({ id: id++, label: todoItem }));
    setTodoItem("");
    console.log(todoItems);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add your task"
          value={todoItem}
          onChange={onChange}
          onKeyUp={handleKeyPress}
        />
        <div>
          <button onClick={onClick}>Submit</button>
        </div>
      </div>
      <ul>
        {todoItems.map(({ id, label }) => (
          <li key={id}>
            <span>{label}</span>
            <button
              onClick={() =>
                setTodoItems(todoItems.filter((item) => item.id !== id))
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// learning notes:
// 1. learn how to map an array to a list of elements
// 2. onClick for button, onSubmit for Form
// 3. remember the map template: { items.map((id, something) => ( <li key={id}> {something} </li> ))}
// 4. remember the filter template: { items.filter((item) => item.id !== id) } to delete item, for some reason, it's not working when I extrated the function to external function
// 5. use onKeyUp to trigger onClick when user press Enter key
