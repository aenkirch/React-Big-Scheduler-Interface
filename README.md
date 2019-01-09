# Interface for React-Big-Scheduler

## What is this project ?

This source code is the source code of a **soon-to-be-released website**.

## Technologies used

**Back-end** : Node.JS
**Front-end** : React/Redux

## Structure of the project

The project is split in two parts : the **root** directory which is opened on the server side and the **client** directory which is opened on the client side.

Files opened on server side offer a REST API which communicates whith mysql-server : this REST API offer basic CRUD (Create/Read/Update/Delete) services.
Files opened on client side offer an interface in order for the user to launch actions on the database or just in order to see the scheduler.

## How can I use it ?

**yarn dev** : when on root directory, will run bother server and client sides
**yarn start** : when on either of the project parts, will launch either server or client side alone

## Some errors fixes

**EADDRINUSE** : **killall node** will fix this error, may happen if you opened unintentionally two instances of the project

## Credits

Thanks to **StephenChou1017** for the scheduler component he made and for his help during this project development !