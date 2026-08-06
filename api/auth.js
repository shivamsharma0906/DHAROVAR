export default function handler(req, res) {
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).send('Error: GITHUB_CLIENT_ID environment variable is not configured in Vercel.');
    return;
  }

  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`);
}
