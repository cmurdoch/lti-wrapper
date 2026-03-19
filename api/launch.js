const lti = require('ims-lti');

module.exports = async (req, res) => {
  const key = process.env.LTI_KEY;
  const secret = process.env.LTI_SECRET;
  const redirectUrl = process.env.REDIRECT_URL || 'https://cmurdoch.github.io/';

  // Debug logging
  console.log('--- LTI Launch Attempt ---');
  console.log('Method:', req.method);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('LTI_KEY env var set:', !!key);
  console.log('LTI_SECRET env var set:', !!secret);
  console.log('oauth_consumer_key from POST:', req.body?.oauth_consumer_key);
  console.log('Keys match:', key === req.body?.oauth_consumer_key);
  console.log('All POST params:', JSON.stringify(req.body, null, 2));

  const provider = new lti.Provider(key, secret);

  provider.valid_request(req, (err, isValid) => {
    if (err || !isValid) {
      console.error('Validation failed. Error:', err?.message || err);
      console.error('isValid:', isValid);
      return res.status(401).send('Invalid LTI launch request.');
    }

    console.log('Valid LTI launch!');
    console.log('User:', provider.userId);
    console.log('Roles:', provider.roles);

    res.writeHead(303, { Location: redirectUrl });
    res.end();
  });
};
