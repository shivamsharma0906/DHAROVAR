export default async function handler(req, res) {
  const { code } = req.query;
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    res.status(400).send('Error: Missing authorization code.');
    return;
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();
    const token = data.access_token;

    if (!token) {
      res.status(400).send(`Error: ${data.error_description || 'Failed to acquire access token.'}`);
      return;
    }

    const postMsgContent = {
      token: token,
      provider: 'github',
    };

    const message = `authorization:github:success:${JSON.stringify(postMsgContent)}`;

    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authenticating...</title>
      </head>
      <body>
        <p>Completing authentication...</p>
        <script>
          window.opener.postMessage("authorizing:github", "*");
          window.opener.postMessage(${JSON.stringify(message)}, "*");
          window.close();
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error during GitHub OAuth callback.');
  }
}
