# Front-End part (client side)

We will mainly see here things that could be useful for you to understand quicker how was the client side of the project made and thought.

---

## How is a React/Redux project made ?

You'll see in this project that the `src/` folder has itself folders :
<ul>
    <li><strong>components</strong>: it mainly contains the HTML elements that will be displayed for the user to see
    <li><strong>actions</strong>: it contains functions which communicates with the <strong>API</strong> (server side of the project) and then pass the datas they get to the reducers
    <li><strong>reducers</strong>: it contains the state which will be used by the whole app (arrays, objects, etc...)
    <li><strong>constants</strong>: as its name suggests, contains constants which describes what modifications are made on the state when actions are triggered
</ul>