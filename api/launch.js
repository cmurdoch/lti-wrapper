const lti = require('ims-lti');

module.exports = async (req, res) => {
  const key = process.env.LTI_KEY;
  const secret = process.env.LTI_SECRET;
  const redirectUrl = process.env.REDIRECT_URL || 'https://cmurdoch.github.io/';

  // Fix for reverse proxy (Vercel terminates SSL, so the function
  // sees http:// internally, but Canvas signed with https://)
  req.protocol = req.headers['x-forwarded-proto'] || 'https';
  
  // Also ensure the host header is correct
  req.headers.host = req.headers['x-forwarded-host'] || req.headers.host;

  const provider = new lti.Provider(key, secret);

  provider.valid_request(req, (err, isValid) => {
    if (err || !isValid) {
      console.error('Validation failed. Error:', err?.message || err);
      return res.status(401).send('Invalid LTI launch request.');
    }

    console.log('Valid LTI launch!');
    console.log('User:', provider.userId);
    console.log('Roles:', provider.roles);

    res.writeHead(303, { Location: redirectUrl });
    res.end();
  });
};
