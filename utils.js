import 'dotenv/config';

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function parseYaku() {
/**
   * TODO(Hayato):
   * Given a string like "234s234678p23466m", return a list of tiles so that they all
   * the number + tile type. For "234s234678p23466m" as the example, we should return
   * ["2s", "3s", "4s", "2p", "3p", "4p", "6p", "7p", "8p", "2m", "3m", "4m", "6m", "6m"]
   * We can ignore winds and dragons for now.
   * 
   * This function is limited strictly to only souzu pinzu and manzu; if there are any other tile id it will just parse them together
   */
  const parsedYaku = [];
  let sou = str.indexOf("s");     //check position of tile id
  let pin = str.indexOf("p");
  let man = str.indexOf("m");

  const temp = [sou, pin, man];     //sort tile id by increasing order
  temp.sort((a, b) => a - b);       //ex: [3, -1, 16] -> [-1, 3, 16] 

  for (let i = 0; i < str.length; ++i)
  {
    if(temp.includes(i)) continue;          //if cursor is on the tile id continue and skip current iteration

    if (i < temp[0]) parsedYaku.push(str[i] + str[temp[0]]);          //insert tiles
    else if (i < temp[1]) parsedYaku.push(str[i] + str[temp[1]]); 
    else if (i < temp[2]) parsedYaku.push(str[i] + str[temp[2]]);
  }
  
  return parsedYaku;
}