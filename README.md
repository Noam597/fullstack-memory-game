# fullstack-memory-game

## Frontend

Built with React a fully responsive modeule CSS app that includes a sign-up and login form with strong password security requirements.

Reusable components (Forms,Buttons,Overlays).

After the user is signed in he/she can choose to play a memory game on different difficulty (easy,moderate,hard or a time-attack)
upon signing up to the website after verifying the email he/she gets the user is given automatically 30 coins to play with every game that is played cost a coin.
The player has the option to buy more coins with the use of paypal and his best scores are kept in his/her profile.

A registered user has the option to change their password

There is also and admin page where where only the admin has access to.

The admin has the option of adding new player,removing players,banning players or adding to the player additional coins for free.

The admin has the option of lowering or raising the prices of the games



## Backend

Server side built with node.js-express ,nodemailer,bcrypt,sql2,json-web-token and MYSQL DataBase .
 Sign up and login:
 Sign up :
 
 the server will check in database if the user exists if so it will return that the user exists if not after fully inspecting the sign up form
 it will hash the new users password using bcrypt and send a verification email to the user.
 the new users will have to answer 2 security questions upon signup that will be used later in the event the user wants to change his/her password.
 
 
 Login:
 
 The server will check if the user has verified his email if not the sever will return a message the that the user isnt verified,
 after the server will check if the user has been banned by the admin if so the server will return a message that the user has been banned,
 if the user has been verified and not banned the server will compare the users email and hashed password and if it matches the user will recieve a token generated by JWT(json-web-token) and allowed access to the site
 
 playing and payments:
 
 The server will use JWT to authenticate the user.
 and then check the ammount of coins the user has and compare it to the price of the game if the price exceeds the amount the user has the server will return a message that user does not have enough coins
 
 The user can buy through paypal more coins if the payment goes through on the front end the server will update the amount of coins the player has in his account by the amount purchased on paypal, the server will reject 0 or negative numbers sent from the front end 
 after a successful purchase the players purchase will be save in a payment log on the database.
 
 Password Change:
 
  Upon sign up the user will be asked to select 2 questions and give their own answers if the user wants to change his/her password they must enter their email ,if the account does not exist the server rejects the request if the account exist the user will be asked the 2 questions and have theyre answers compared if they're false the request is rejected if the answers are correct and the user may enter a new password that will be hashed and updated
  
  Admin Authourization and Authentication:
   on the front end the admin will recieve the users information and will have the option through the server to remove or ban existing players ,add new players and automatically verify them as well as award users more coins free of charge 
   all api calls and action made by the admin will be verified by JWT middleware to protect against hackers.
   
   middleware:
   
   JWT - JWT verification for all actions.
   
   SQL INJECTION - custom made middleware that detects SQL Syntax being sent in the body that responds with a 403 error if detected to prevent malicious SQL code from manipulating the database.
   
   NO DATA - if data is sent containing no data (e.g blank or white spaces) the server will return the request 
 
 


