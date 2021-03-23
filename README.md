# bist-cached-api

A wrapper cached api server script that returns the latest prices of bist stocks, updates the cached data every new hour.

**Notice:** The data is 1-2 hours delayed on avg

You need to give write permission to `server.js`

Get your API key here: https://collectapi.com/api/economy/gold-currency-and-exchange-api/liveBorsa

Reverse proxy with nginx: https://www.tecmint.com/nginx-as-reverse-proxy-for-nodejs-app/

MAKE SURE you are fetching the endpoint with `'Cache-Control': 'no-cache'` header.
