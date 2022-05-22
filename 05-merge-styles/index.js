const fs = require("fs");
const path = require("path");

const pathSrc = path.join(__dirname, "styles");

(async () => {
  //Чтение содержимого папки styles
  const files = await fs.promises.readdir(path.join(pathSrc));
  // создаем поток для записи
  const output = fs.createWriteStream(
    path.join(__dirname, "project-dist", "bundle.css")
  );

  for (const file of files) {
    //проверяем на файл и расширение css
    const stats = await fs.promises.stat(path.join(pathSrc, file));
    if (stats.isFile() && path.extname(file) === ".css") {
      const promiseFileData = await fs.promises.readFile(
        path.join(pathSrc, file),
        "utf-8"
      );
      const fileData = await promiseFileData.toString();
      output.write(fileData);
    }
  }
})();
