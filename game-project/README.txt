1.It is a Node.js app (myapp)
2.There is a home page with links to all other pages (views/includes/navigation.ejs;line:6)
3.There is a register page(register.html, main.js;line:228)
4.There is user authentication page (login.html, line:286)
5.There is an add recipe page (available only to logged in users) for each recipe store at least three items: name of the recipe, text of the recipe and the name of the user who created/added the recipe.(main.js, line:363)
6.There is an update recipe page (available only to logged in users) (edit.html, main.js;line:26)
7.There is a delete recipe page (available only to logged in users) (delete.html, main.js;line:97)
8.There is a list page, listing all recipes and the name of the user who added the recipe (list.ejs, main.js;line:334)
9.The forms have some validations (main.js;line:234)
10.There are useful feedback messages to the user(main.js; line:395 line:317 , line:322 ,line:315, line 279, line:123, line:131,line:126,line:58)
11.It has a database backend that implements CRUD operations (the database can be MySQL or Mongodb) (index.js, line:35)
12.The create & update operations take input data from a form or forms (available only to logged in users) (main.js, line:36,88,118,211,261,263,386,387,388) 
13.The login process uses sessions(main.js, line:312)
14.Passwords should be stored as hashed(main.js, line:273)
15.There is a way to logout(main.js, line:399)
16.There is a basic api i.e. recipes content can be accessed as json via http method, It should be clear how to access the api (this could include comments in code)(main.js, line:168)
17.There are links on all pages to home page providing easy navigation for users (views/includes/navigation.ejs;line:6)
18.I have inplemented the extention where only the user who created a recipe is able to update it and delete it.(main.js: line:57,line:121)
19.There is a search page to allow users to search for recipes in the database.

I have used Mongodb. The name of the database is recipebankdb.It has 2 collections. One called users and another called recipe. The user collection has fields called username, email and passwordHash.
The fields in the recipe collection are called name,description and user. There is a reference between the username field in the users colection and the user field in the recipe collection.
