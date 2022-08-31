const express = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const app = express();
const port = 8000;

app.use("/static", express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// 체크보드 페이지
app.get("/cb", async (req, res) => {
  const id = encodeURI(req.query.id);
  const config = {
    headers: {
      "X-Riot-Token": `${process.env.API_KEY}`,
    },
  };
  let uuid = req.query.uuid;
  /* 이부분 js 이해도 부족, null, undefined를 구분 못해서 생기는 문제
  if (uuid) {
    console.log(uuid);
  } else {
    uuid = uuidv4();
    console.log(uuid);
  }
*/
  try {
    // 개선사항 : 병렬처리하기 두 axios 는
    const summoner = await axios.get(
      `${process.env.LOL_SUMMONER_URL}/${id}`,
      config
    );

    const idEncrypted = summoner.data.id;

    const spectator = await axios.get(
      `${process.env.LOL_SPECTATOR_URL}/${idEncrypted}`,
      config
    );

    res.render("checkboard", { id: decodeURI(id), data: spectator.data });
  } catch (error) {
    res.render("checkboard-error", {
      id: decodeURI(id),
    });
  }
});

// index
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port);
