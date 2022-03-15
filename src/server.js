const app = require("./index");
const connect = require("./configs/db");
app.listen(7700, async () => {
  try {
      await connect()
      console.log("listening port 7700")
  } catch (error) {
    console.log("error:", error);
  }
});
