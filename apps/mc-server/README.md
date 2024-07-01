# Hono server for mc subnet

# Prerequisites
- You should have comx key created in your `~/.commune/key` dir with a name you want to use
- You should register you miner on chain on a port you want to run it.

# Config server
Create `config.json` or copy `config.example.json` and fill the values:

```
{
  "bankKeyName": "epic",
  "maxComBurn": 12,
  "unstakeTargetAddress": "5Fh5GBGmsDV5Sz11Vj6KcPCixHoTtBNK2LQLK5jq9VjQTK5w",
  "serverIp": "x.x.x.x"
}
```

- `bankKeyName` - key which will feed missing $com for registrations if miner balance is too low
- `maxComBurn` - max burn rate you wish to pay
- `unstakeTargetAddress` - address to which banned miners will transfer funds
- `serverIp` - external ip of your server to register the miner

# Run miner command
You can use env variables or posititonal params:

`pnpm mc:serve --miner=key-name --port=8001`

or

`MINER_NAME=key-name PORT=8001 pnpm mc:serve`

additional params:
- `apiUrl` / `API_URL` - if you do not want to fetch form default proxy url
- `dev` / `DEV` - if you want to test requests (server does not then verify if request comes from validator)


# Run as background service

You can use pm2 to run server as background service:

`pm2 start "pnpm mc:serve --miner=key-name --port=8001" --name=key-name`