see useEffect, especially, cleanup, because we need it with onAuthStateChanged
 https://www.youtube.com/watch?v=QQYeipc_cik

When does useEffect run?

    useEffect runs outside the render cycle, thus, all code above 'return' of component is executed, all code after 'return' is executed and only then useEffect is run 

How does useEffect run?

    based on every render - if no dependency array, on initialization - if dependency array is empty, on change of state of element in depenency array 

What is the differene between primitive and non-primitive dependencies?

    const [name, setName] = useState("");
    const [state, setState] = useState({
        name: "",
        selected: false,
    });

    useEffect(()=>{
        console.log("The state has changed, useEffect runs!");
    },[state]);

    const handleAdd = () => {
        setState((prev) => ({ ...prev, name }));
    };

    const handleSelect = () =? {
        setState((prev) => ({ ...prev, selected: true}));
    };

    if state was merely a string called name and we updated that state to the last input, namely, have primitive dependency (string, number, boolean), each update of the state would be reflected in the useEffect.
    However, we have an object {name: '', selected: false}; which if we update via handleAdd and handleSelect to ex. john and true, subsequent clicking will update the reference in the state due to (prev) => ({ ...prev, name }) and (prev) => ({ ...prev, selected: true}), but it will not result in any new result for the user, name is still john, selected is still true,
    BUT useEffect will continue to execute due to state being a depenedency. 
    Solve problem with specific watching of non-primitive (objects) dependencies being updated only when there is an actual update of the properties of those objects - useMemo:

    const [name, setName] = useState("");
    const [state, setState] = useState({
        name: "",
        selected: false,
        age: 20,
        city: "",
    });

    const user = useMemo(
        () => ({
            name: state.name,
            selected: state.selected,
        }),
        [selected.name, state.selected]
    )

    useEffect(()=>{
        console.log("The state has changed, useEffect runs!");
    },[user]);

    const handleAdd = () => {
        setState((prev) => ({ ...prev, name }));
    };

    const handleSelect = () =? {
        setState((prev) => ({ ...prev, selected: true}));
    };

    useMemo triggers update of state when there is actually an update of the properties of the object, thus, triggering the execution of useEffect

    OR you can directly set the primitives (object properties) in the dependency array:

    const [name, setName] = useState("");
    const [state, setState] = useState({
        name: "",
        selected: false,
        age: 20,
        city: "",
    });

    useEffect(()=>{
        console.log("The state has changed, useEffect runs!");
    },[selected.name, state.selected]);

    const handleAdd = () => {
        setState((prev) => ({ ...prev, name }));
    };

    const handleSelect = () =? {
        setState((prev) => ({ ...prev, selected: true}));
    }; 


    useMemo optimizes state update efficiently when useEffect has a non-primitive dependency

    useMemo - used to keep expensive, resource intensive functions from needlessly running:


        const expensiveCalculation = (num) => {
        console.log("Calculating...");
        for (let i = 0; i < 1000000000; i++) {
            num += 1;
        }
        return num;
        };

        WITHOUT USEMEMO

        const App = () => {
        const [count, setCount] = useState(0);
        const [todos, setTodos] = useState([]);
        const calculation = expensiveCalculation(count);

        const increment = () => {
            setCount((c) => c + 1);
        };
        const addTodo = () => {
            setTodos((t) => [...t, "New Todo"]);
        };

        return (
            <div>
            <div>
                <h2>My Todos</h2>
                {todos.map((todo, index) => {
                return <p key={index}>{todo}</p>;
                })}
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <hr />
            <div>
                Count: {count}
                <button onClick={increment}>+</button>
                <h2>Expensive Calculation</h2>
                {calculation}
            </div>
            </div>
        );
        };

        WITH USEMEMO

        const App = () => {
            const [count, setCount] = useState(0);
            const [todos, setTodos] = useState([]);
            const calculation = useMemo(() => expensiveCalculation(count), [count]);

            const increment = () => {
                setCount((c) => c + 1);
            };
            const addTodo = () => {
                setTodos((t) => [...t, "New Todo"]);
            };

            return (
                <div>
                <div>
                    <h2>My Todos</h2>
                    {todos.map((todo, index) => {
                    return <p key={index}>{todo}</p>;
                    })}
                    <button onClick={addTodo}>Add Todo</button>
                </div>
                <hr />
                <div>
                    Count: {count}
                    <button onClick={increment}>+</button>
                    <h2>Expensive Calculation</h2>
                    {calculation}
                </div>
                </div>
            );
        };

When should we use a cleanup function?

    We have to take note of the mount/unmount and subscribe/unsubscribe processes in the app. An interval for example. A more professional example would be making a request for a big json but terminating it half way through. We need a cleanup function so that the unwanted request is cancelled and state is not updated with data from it.

        useEffect(()=>{
            let unsubscribed = false;
            fetch(`http://someurl.com/users/${id}`)
                .then((res)=>res.json())
                .then((data)=>{
                    if(!unsubscribed){
                        setUser(data);
                    }
                })
            return () => {
                unsubscribed = true;
            }
        }, [id])

    In this code, the unsubscribed variable is correctly declared and initialized to false inside the useEffect hook. The fetch function is then called to retrieve data from the API. If the component is still mounted when the response comes back, the setUser function is called to update the state with the data.

    If the component is unmounting before the response comes back, the unsubscribed variable is set to true in the cleanup function. Since the cleanup function is guaranteed to run before the next effect runs, it means that the unsubscribed variable will be set to true before the response comes back. In this case, the if (!unsubscribed) condition in the .then callback will be true, and the setUser function won't be called, preventing a potential memory leak caused by updating state on an unmounted component.

    Note that the unsubscribed variable is declared inside the useEffect hook, so it's local to the effect function and will be reinitialized to false every time the effect runs. The unsubscribed variable persists between the fetch calls because it's declared in the same scope as the cleanup function, but it will be reset to false when the effect runs again.

    Overall, the key point is that the cleanup function sets a variable that's used to prevent the effect from updating state on an unmounted component, and the variable persists between cleanup functions because it's declared in the same scope as the cleanup function.