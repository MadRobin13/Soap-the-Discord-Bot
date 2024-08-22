# Soap the Discord Bot!

### Do you have Problems with profanity in your server?

![tom and jerry cleaning motuh with soap gif](https://media.tenor.com/RbOWIwfiCiwAAAAM/wash-mouth.gif)

**Then you're in luck because I've just created the perfect companion for your server.**

**Meet Soap🧼: the dependable bot who is willing to call out anyone for cussing and insulting others, something we can't tolerate in an inclusive community.**

**He even keeps _detailed_ logs of obscene messages to keep you in control of your server.**

**He'll keep your server healthy to keep it growing and maintain a welcoming community!**

*This project was started due to a need for moderation and record keeping in discord servers that a single human could not achieve. 

___

## To run this code:
 - add a file called .env to the base directory and add you github token as TOKEN and you mongodb uri as URI
 - Add your database name to the dbName varaible and add the collection name to the collectionName variable
 - use `npm run build` to run the code using nodemon
 - use `npm run test` to only run [index.js](src/index.js) once
   
___

## How to Use:
1. Run [index.js](src/index.js)
2. if any message contains a word from [words.txt](src/words.txt), it will be deleted, the bot will say "_Don't swear here @author_" and details will be stored in a MongoDB database in the format:
   
   `
_id: ObjectId
name: "author"
username: "username"
id: "author ID"
time: "day, month, date, year, 24 hour time in realtion to GMT"
message: "message content"
   `
