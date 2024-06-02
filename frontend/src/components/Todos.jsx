export function Todos({todos}) {r

    return (
        <div>
            {todos.map(todo => (
                <div key={todo.id}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button>{todo.completed ? "completed" : "Mark as Complete"}</button>
                </div>
            ))}
        </div>
    );
}
