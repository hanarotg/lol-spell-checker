const axios = require("axios");
const fs = require("fs");
const path = require("path");

// common settings
const version = "12.11.1";
const region = "en_US";
const spells_dir = path.join(__dirname, "spells");
const champions_dir = path.join(__dirname, "champions");

// check dir
if (fs.existsSync(champions_dir) == false) {
  fs.mkdirSync(champions_dir);
}
if (fs.existsSync(spells_dir) == false) {
  fs.mkdirSync(spells_dir);
}

// get spell data
const setSpellset = async () => {
  try {
    const champion_list_url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/${region}/champion.json`;
    const champion_image_url = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion`;

    const response = await axios.get(champion_list_url);
    const champion_list = response.data.data;

    Object.entries(champion_list).forEach(async ([key, value]) => {
      try {
        console.log("[key] : ", key, " [value]  ", value.key);
        const response_image = await axios.get(
          `${champion_image_url}/${key}.png`,
          { responseType: "arraybuffer" }
        );

        const buffer = new Buffer.from(response_image.data, "binary").toString(
          "base64"
        );
        fs.writeFile(
          `${champions_dir}/${value.key}.png`,
          buffer,
          "base64",
          (error) => {
            console.log("[fs] 파일 업로드 중 에러 ", error);
          }
        );
      } catch (error) {
        console.log(error);
      }
    });

    // console.log(response.data.data.Ahri);
  } catch (error) {
    console.log(error);
  }
};

setSpellset();
