const fs = require("fs");
const path = require("path");

const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, "text.txt"));
stdout.write("write something... \n");

stdin.on("data", (data) => {
  let str = data.toString().trim();
  if (str === "exit") {
    process.exit();
  } else {
    output.write(data);
  }
});

process.on("SIGINT", () => {
  process.exit();
});
process.on("exit", () => stdout.write("Bye!"));
