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

// get Champion data
const setChampionset = async () => {
  try {
    const champion_list_url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/${region}/champion.json`;
    const champion_image_url = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion`;

    const response = await axios.get(champion_list_url);
    const champion_list = response.data.data;

    Object.entries(champion_list).forEach(async ([key, value]) => {
      try {
        // console.log("[key] : ", key, " [value]  ", value.key);
        // download champion image from RIOT
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
            if (error) {
              console.log(
                `[fs] ${value.key}.png (${key}) 파일 업로드 중 에러 : `,
                error
              );
            } else {
              console.log(`[fs] ${value.key}.png (${key}) 파일 업로드 성공`);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// get spell set
const setSpellset = async () => {
  try {
    const spell_list_url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/${region}/summoner.json`;
    const spell_image_url = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell`;

    const response = await axios.get(spell_list_url);
    const spell_list = response.data.data;

    let spell_cooldown = {};

    Object.entries(spell_list).forEach(async ([key, value]) => {
      try {
        // console.log(key, value.key, value.cooldown[0]);
        spell_cooldown[value.key] = value.cooldown[0];

        // download spell image from RIOT
        const response_image = await axios.get(
          `${spell_image_url}/${key}.png`,
          {
            responseType: "arraybuffer",
          }
        );

        const buffer = new Buffer.from(response_image.data, "binary").toString(
          "base64"
        );
        fs.writeFile(
          `${spells_dir}/${value.key}.png`,
          buffer,
          "base64",
          (error) => {
            if (error) {
              console.log(
                `[fs] ${value.key}.png (${key}) 파일 업로드 중 에러 : `,
                error
              );
            } else {
              console.log(`[fs] ${value.key}.png (${key}) 파일 업로드 성공`);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    });

    // save spell-cooldown json object
    const spell_cooldown_str = JSON.stringify(spell_cooldown);
    fs.writeFile(
      `${spells_dir}/spell_cooldown.json`,
      spell_cooldown_str,
      (error) => {
        if (error) {
          console.log("[spell_cooldown] 저장하는 과정에서 에러 발생 : ", error);
        } else {
          console.log("[spell_cooldown] 저장 완료");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

setChampionset();
setSpellset();
