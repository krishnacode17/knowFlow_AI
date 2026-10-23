
require("dotenv").config();

const app = require("./src/app");
const connectToDb = require("./src/DB/db");



const PORT = process.env.PORT || 3003;

async function startServer() {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start application");
    process.exit(1);
  }
}
 
startServer();
