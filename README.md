Getting Started
---------------

1) Make sure you are on the branch - feature/talk-space-ticket-number.

2) In the server folder, you will need to create a .env file. You are more than welcome to use the following credentials.

PORT=3100ACCESS_TOKEN_SECRET=SECRETREFRESH_TOKEN_SECRET=ALSOSECRETDATABASE_URI=mongodb+srv://brandonlee:brandonlee@cluster0.xarnj5r.mongodb.net/?retryWrites=true&w=majority

3) Inside of the client folder run - npm start

5) Inside of the server folder run npm run dev


Architecture
---------------
The app is created with a modern React frontend End for a fast and reusable front end.

The server is created with Nodejs with express for a lightning fast and secure back end.

Walking through the front end, starting with the file structure I have used different folders to seperate concerns. You have your lib, which house static values, and your Auth context. Followed by your pages folder, which houses your common views, credientials, the main page (the collection of drawing), and your create page. Each folder holding the associated css file. I decided to do all styles manually as I wanted to keep the app light, as well as display some good clean css.


Some of the packages used for the front end are fontawesome for the icons, axios for data fetching, react-hook-forms with yup for simple clean and validated forms, and toastify for displaying success and error messages.

The main packages for the server side include express of course for the layer it provides for node, mongoose to for a fast lightweight and flexbible database, jsonwebtoken to make log in and auth more secure, bcrypt to has passwords, and nodemon to make development run more smoothly.

You can open the app, register/signup, then you will be taken to a login screen (creating your tokens), then next you will be taken to the main page. From the main page you will be able to see your drawings both public and private with the abilty to delete a chosen drawing, and global drawings (which includes all drawings saved that are tagged public). From the main page you can also logout (clearing browser storage and token storage on the database), you also have the option to go to the create page.

The create page gives you the functionality to draw, update the color, brush size, mark for public and private, and resart from scratch and also save. Behind the scens it uses the Date object to measure your total time drawing, your creation date and time. This also supports retina displays.


Things I would do differently if I had more time with the app
-------------------------------------------------------------
1) Learn more about styling the canvas, as this page is the only page that does not display well on mobile.
2) I would also learn more about how to make the functionality of canvas work well on mobile.
3) I would learn more about the combinations of context settings to create different brush effects.
4) I would love to, and really plan to learn to record the drawing sessions

Trade offs
----------
I think the biggest trade off I made was styling by hand instead of using something like material-ui. I have extensive expirence styling with both regular css and materail (as well as tailwind, sass, etc). I styled by hand to keep the app light.

All in all I really had a great time with this take home test. I had no idea how to use canvas when I began this and I hope I have displayed how fast I can learn, and how well I can implement with just a short amount of time!

Thank you for taking the time to look over this and I hope to hear from you Talkspace soon.

