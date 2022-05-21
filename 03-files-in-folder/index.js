const fs = require("fs/promises");
const path = require("path");

(async () => {
  const pathToFolder = path.join(__dirname, "secret-folder");
  try {
    const files = await fs.readdir(pathToFolder);
    //console.log(files); // возвращает массив файлов и папок

    for (const file of files) {
      const stats = await fs.stat(path.join(pathToFolder, file));
      if (!stats.isDirectory()) {
        const name = file.split(".")[0]; // remove leadingотбрасываем расширение
        const ext = path.extname(file).slice(1); //отбрасываем точку
        const size = Math.floor(stats.size / 1024); // преобразовываем в кб
        console.log(`${name}-${ext}-${size}kb`);
      }
    }
  } catch (err) {
    console.error(err);
  }
})();
