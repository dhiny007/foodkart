# FoodKart

## **Instructions**

* Open the command prompt by running the command **cmd**, and then navigate to the folder named **Foodkart** through command prompt. Run the command **npm install** to install all the necessary packages. Once this command is done,you will see that a folder named node_modules was created in this path. After this,run the command **ng serve** to start the frontend.
* Also start the backend server in the same place by using the command **npm run startServer**.
* Connect the backend to the database through command prompt by using the command **"<THE_PATH_OF_MONGOD.EXE>" --dbpath="<THE_DATABASE_PATH>"**. An example of how the command will look like: "C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath="c:\Mongo Database Details\data\fullstackPractice".
* The backend connection to the database may fail at times. In such cases, just restart the backend server.
* Once the frontend,backend and database are up and running, navigate to the URL **http://localhost:4200/** to view the FoodKart application.

## **Technologies**

* This application is built using Angular for frontend, Node JS for backend and MongoDB for Database. 
* The programming languages used are Typescript,Javascript, HTML,CSS and Bootstrap.

## **Features**

* Create a new account by **signing up** and once this is done, you will be able to **login** into the application using the credentials anytime.
* You will see three tabs in the navigation bar,namely Recipes,Shopping List and Logout.
* The **Recipes** tab contains the list of recipes which have been added by various users and also gives you an option to add new Recipes to the application,edit and delete existing recipes. **Note: This application is common to all users and is not user specific, meaning any logged in user can add,edit and delete data from the application.**
* The **Shopping List** tab contains the list of ingredients which have been added by various users. You will be able to add ingredients, edit and delete existing ingredients.
* Each **login session** will be **valid only upto 1 hour**. After 1 hour of a single user login session, he/she will be **automatically logged out**.
* Clicking on **Logout** will log you out of your current login session instantly.

**HAVE FUN EXPLORING!!**
