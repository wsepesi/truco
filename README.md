# CSE330
Justin Lewitus 488223 jlewitus

William Sepesi 490682 wsepesi

Creative Portion:
- 5 points: Site is visually appealing. Cards are not just text and have images, the user who is playing is always on the bottom. The game could be hosted on a website.
- 5 points: Users can leave and forfeit games. If a user leaves, the other user's game does not continue. If a user forfeits, the other receives a win, and the game is deleted. If one user forfeits, both users can enter into a new game from the screen that pops up.
- 5 points: There is a leaderboard connected to the Mongo DB database with users and their number of wins. The leaderboard is correctly updated and displayed to all users when the "refresh" button is hit.
- 5 points: Lying logic. If a player calls Envido and was lying, the game accounts for this. The other player receives a lying point and Envido points are correct distributed accordingly.

installation:
-run this in both truco and truco_server folders
-yarn install

running:
-in truco folder: yarn start
-in truco_server folder: nodemon server (or yarn start if this doesnt work, im just using this but technically nodemon server should be more dynamic and not leak memory or whatever)
-go to local host 3000 to launch app; server boots to 5000
-database should magically sync up

notes:
tools we are using
-react
-typescript
-react router
-material ui
-react query
-express
-mongodb
-process.env system
-yarn as package manager (NOT NPM PLEASE DONT RUN NPM COMMANDS)

https://bareynol.github.io/mui-theme-creator/

