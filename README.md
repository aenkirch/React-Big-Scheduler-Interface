<h1 align="center">
React-Big-Scheduler Interface
</h1>


<p align="center">
    This is a React/Node.JS app which uses the <a href="https://github.com/StephenChou1017/react-big-scheduler">React-Big-Scheduler project</a> in order to display a scheduler related to a university class which you can select in a list : it also offers some more features like adding events on it, etc...
</p>

![Chat Preview](./docResources/screely2homepage.png)

---
## Some context

This project was developed during a few months as a school project for Paris Descartes University : therefore, the database used on the demo was provided by our teacher.

![Chat Preview](./docResources/bigLogoIUT.jpg)

---

## Features

<ul>
    <li>Selection of the training program and group to show the scheduler</li>
    <li>Drag-and-drop to move an event, save or delete event with live action on the DB</li>
    <li>Add a training program, group, event, subject, unit using forms</li>
    <li>Confirmation of done action or error if one happened on DB displayed on a toast</li>
    <li>Show infos on events displayed on the scheduler</li>
    <li>Handles the conflict between two events if happening at the same time</li>
    <li>2 scheduler views available : two ways to organize your time !</li>
    <li>Single page design </li>
</ul>

---

## Technologies used

**Back-end** : Node.JS <br />
**Front-end** : React w/ Redux <br />
**Database** : MySQL <br />

**Some other ones** : React Semantic UI, Typed.JS, React-Toastify, React-Router

---

## Setup

First, make sure you run a MySQL server (use Wamp for example on Windows) on your computer and make sure Node.JS is installed.
If so : now install yarn by typing `npm install yarn -g`.

Now, go into the project folder and type `yarn install` to install the missing dependencies of the server side of the project, type `yarn install` again in the `client` folder to install the missing dependencies of the client side of the project.

Then, install the database by importing the `.sql` file in the project folder, go into the `server.js` file and at `line 13`, type the username, password, name, and the port you gave to your database.

```
    // Create connection
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        socketPath: '/var/run/mysqld/mysqld.sock', //   comment out this line on non-Linux systems
        port: 3306,
        database: 'nodemysql_test'
    });
```


---

## Usage

<strong>yarn dev</strong> : type this command line when you've finished the setup section, it runs the server side of the project and the client side of the project at the same time to run the full app

<strong>yarn start</strong> : if you type this command line when you're either in the `/` folder of the project, it will run the server side of the project only, if you run it in the `/client` folder of the project, it will run only the client side of the project

---

## Structure of the project

The project is split in two parts : the **root** directory which is opened on the server side and the **client** directory which is opened on the client side.

Files opened on <strong>server side </strong> offer a REST API which communicates with the mySQL server : this REST API offers basic CRUD (Create/Read/Update/Delete) services.

Files opened on <strong>client side </strong> offer an interface in order for the user to launch actions on the database or just in order to see the scheduler.

---

## Architecture of the project

The project uses an **MVC** architectural pattern : 
<ul>
    <li>Model : it's the database which was provided by our teacher, it's connected to the controller</li>
    <li>View : what the user sees when he's accessing the website, it's the React code you can see in the /client folder</li>
    <li>Controller : the server side of the project (/ folder) and acts as a middleware between the Model and the View of the project</li>
</ul>

![Schema MVC](./docResources/schemaMVC.png)

---

## Some errors fixes

**EADDRINUSE** : **killall node** will fix this error, may happen if you opened unintentionally two instances of the project

---

## Credits

Thanks to <a target="_blank" href="https://github.com/StephenChou1017" rel="noopener noreferrer">StephenChou1017</a> for the scheduler component he made and for his help during this project development !

Thanks to our teacher Jean-Michel Ilié for giving our class such a project which allowed me to learn a lot of the technologies I used to develop this project !

And of course, thanks to every person who helped me during this project and to every person who developed a package I used in this project, it's all because of you ;)

---

## License

This project is licensed under the terms of the MIT license.