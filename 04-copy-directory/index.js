const fs = require("fs/promises");
const path = require("path");

const pathSrc = path.join(__dirname, "files");
const pathDest = path.join(__dirname, "files-copy");

(async () => {
  //создаем папку files-copy
  await fs.mkdir(pathDest, { recursive: true });
  //получаем файлы из папки files
  const files = await fs.readdir(pathSrc);

  //чистим папку files-copy
  const filesDest = await fs.readdir(pathDest);
  for (const file of filesDest) {
    await fs.unlink(path.join(pathDest, file));
  }

  //копируем файлы
  for (const file of files) {
    await fs.copyFile(path.join(pathSrc, file), path.join(pathDest, file));
  }
})();
