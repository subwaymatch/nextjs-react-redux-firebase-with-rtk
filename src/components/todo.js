import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

function TodosComponent(props) {
  const firestore = useFirestore();
  useFirestoreConnect('todos');

  const [newTodoText, setNewTodoText] = useState('');

  const todos = useSelector((state) => state.firestore.ordered.todos);

  return (
    <div>
      <h1>Todos Component</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          firestore
            .collection('todos')
            .add({
              text: newTodoText,
            })
            .then(() => {
              console.log('Then it was done');
            });
          e.preventDefault();
          setNewTodoText('');
        }}
      >
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => {
            setNewTodoText(e.target.value);
          }}
        />
        <input type="submit" disabled={!newTodoText} value="Add Todo" />
      </form>

      {todos
        ? todos.map((todo) => <div key={todo.id}>{todo.text}</div>)
        : 'Loading'}
    </div>
  );
}

export default TodosComponent;
