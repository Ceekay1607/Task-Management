require("dotenv").config();
const app = require("./src/app.js");

//start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
