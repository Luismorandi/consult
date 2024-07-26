import { now } from "mongoose";
import app, { port } from "./app";

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} - ${new Date()}`);
});
