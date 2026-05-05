import http from 'http';
import { exec } from 'child_process';
import os from 'os';

const client_id = 'ca7e103fb7c14c28b829deb58c9a6c5c';
const client_secret = '29f279e32b85484b8c57f9854d17febc';
const redirect_uri = 'http://127.0.0.1:3000/callback';

const scope = 'user-read-currently-playing user-read-recently-played';
const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}`;

console.log('1. Opening browser to authenticate with Spotify...');
console.log('If your browser does not open automatically, click this link:\n', authUrl, '\n');

// Try opening browser
const platform = os.platform();
let openCmd = 'xdg-open';
if (platform === 'darwin') openCmd = 'open';
else if (platform === 'win32') openCmd = 'start';

exec(`${openCmd} "${authUrl}"`);

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/callback')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const code = url.searchParams.get('code');
    
    if (code) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>Success!</h1><p>You can close this window now and check your terminal.</p>');
      
      server.close();
      
      const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
      
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri
        })
      });
      
      const data = await response.json();
      
      console.log('\n=========================================');
      console.log('🎉 SPOTIFY TOKENS ACQUIRED 🎉');
      console.log('=========================================\n');
      console.log('Copy these values into your apps/web/.env file:\n');
      console.log(`SPOTIFY_CLIENT_ID=${client_id}`);
      console.log(`SPOTIFY_CLIENT_SECRET=${client_secret}`);
      console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
      console.log('\n=========================================');
      process.exit(0);
    } else {
      res.writeHead(400);
      res.end('No code provided in the URL');
    }
  }
});

server.listen(3000, () => {
  console.log('Local server listening on http://localhost:3000 to catch the callback...');
});
