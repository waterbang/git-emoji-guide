import fs, { writeFile, writeFileSync } from "fs";
import path from "path";

interface IEmojis {
  emoji: string;
  entity: string;
  code: string;
  description: string;
  name: string;
}

const file1 = path.join(process.cwd(), "./git.json");
const file2 = path.join(process.cwd(), "./gitmojis.json");
const file3 = path.join(process.cwd(), "./gitList.json");

function readPromise(file: string): Promise<IEmojis[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, buf) => {
      const json: IEmojis[] = JSON.parse(buf);
      resolve(json);
      if (err) {
        reject(err);
      }
    });
  });
}

function encodeUnicode(str: string) {
  let res = [];
  for (let i = 0; i < str.length; i++) {
    res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + res.join("\\u");
}

(async function () {
  const file1Json = await readPromise(file1);
  const file2Json = await readPromise(file2);
  file1Json.map((item, index, arr) => {
    file2Json.map((i) => {
      if (item.name === i.name) {
        console.log(i.description);
        arr[index].description = i.description;
      }
    });
  });
  // file2Json.forEach((item, index, arr) => {
  //   arr[index].description = encodeUnicode(item.description);
  // });
  writeFileSync(file3, JSON.stringify(file1Json));
})();
