<img src="https://user-images.githubusercontent.com/34812887/193443993-e6e79262-9693-4498-afd2-61d284c1382b.png" style="width: 100px" />

# SPELL.TEAM
league of legends spell check timer board.

![21241242](https://user-images.githubusercontent.com/34812887/193410614-a3bf5c29-f0a3-476d-b0ee-0d5edf1923fc.png)

---

# installation steps

### Prerequisites

* [node.js](https://nodejs.org/ko/) installed

### Clone

```bash
git clone https://github.com/hanarotg/spell.team.git
npm i
```

### Environment setting

create `.env` file in root directory, and add three environment variables.

to get API KEYS, visit [riot developer portal](https://developer.riotgames.com/) and generate development/product key.

```bash
API_KEY=your-api-key
LOL_SUMMONER_URL=summoner-api-url
LOL_SPECTATOR_URL=spectator-api-url
```

* `.env` example

```bash
API_KEY=RGAPI-e666251c-fc4e-4551-837a-18014b83c6ac
LOL_SUMMONER_URL=https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name
LOL_SPECTATOR_URL=https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner
```

### Update LOL data

#### Update spell and champion images setting

you may update `verion`, `region`, download directories in `/data/automatch.js`

* [Riot developer portal - league of legends - version](https://developer.riotgames.com/docs/lol#data-dragon_versions)
* [Riot developer portal - league of legends - region](https://developer.riotgames.com/docs/lol#data-dragon_regions)
* [Riot developer portal - league of legends - languages](https://ddragon.leagueoflegends.com/cdn/languages.json)

```javascript
// common settings
const version = "12.16.1";
const region = "en_US";
const spells_dir = path.join(__dirname, "spells");
const champions_dir = path.join(__dirname, "champions");
```


#### Download lastest spell and champion images

`/data/automatch.js` will download lastest version of spell and champion images to `/data` directory named with spellID and championID.

```bash
cd data
node automatch.js
[spell_cooldown] 저장 완료
[fs] 3.png (SummonerExhaust) 파일 업로드 성공
[fs] 39.png (SummonerSnowURFSnowball_Mark) 파일 업로드 성공
[fs] 4.png (SummonerFlash) 파일 업로드 성공
...
[fs] 82.png (Mordekaiser) 파일 업로드 성공
[fs] 240.png (Kled) 파일 업로드 성공
[fs] 150.png (Gnar) 파일 업로드 성공
```
#### Get lastest spellcooldown

`/data/spell.js` will print spellcooldown object

```bash
cd data
node spell.js
21 Barrier 180
1 Cleanse 210
14 Ignite 180
...
  '21': { name: 'Barrier', cooldown: 180 },
  '30': { name: 'To the King!', cooldown: 10 },
  '31': { name: 'Poro Toss', cooldown: 20 },
  '32': { name: 'Mark', cooldown: 80 },
  '39': { name: 'Mark', cooldown: 80 },
  '54': { name: 'Placeholder', cooldown: 0 },
  '55': { name: 'Placeholder and Attack-Smite', cooldown: 0 }
}
```

### Run

spell.team will run in [localhost:3000](localhost:3000)

```bash
node app.js
```

# Others

### Approved as product?

yes.

![1324215252](https://user-images.githubusercontent.com/34812887/193444230-84ea34b6-8694-45a5-9d00-2aedb2da5403.png)

# Contributers
[Lee Taegyeong](https://github.com/hanarotg)
