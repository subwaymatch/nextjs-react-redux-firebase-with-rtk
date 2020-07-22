import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

export default function Todos() {
  useFirestoreConnect([
    { collection: 'todos' }, // or 'todos'
  ]);

  const todos = useSelector((state) => state.firestore.ordered.todos);

  console.log(todos);

  return (
    <div>
      <h1>Todos</h1>

      {!todos && <div>Loading Items</div>}

      {todos && todos.map((todo) => <div key={todo.id}>{todo.text}</div>)}
    </div>
  );
}
