# SPELL.TEAM

league of legends spell check timer board

![21241242](https://user-images.githubusercontent.com/34812887/193410614-a3bf5c29-f0a3-476d-b0ee-0d5edf1923fc.png)

---

# installation steps

### clone

```bash
git clone https://github.com/hanarotg/spell.team.git
npm i
```

### .env settings

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

### update LOL data

##### autopmatch.js - get spell and champion images

```bash
cd data
node automatch.js
```


