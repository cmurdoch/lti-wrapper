const lti = require(‘ims-lti’);

module.exports = async (req, res) => { const key = process.env.LTI_KEY;
const secret = process.env.LTI_SECRET; const redirectUrl =
process.env.REDIRECT_URL || ‘https://cmurdoch.github.io/’;

const provider = new lti.Provider(key, secret);

provider.valid_request(req, (err, isValid) => { if (err || !isValid) {
console.error(‘LTI validation failed:’, err); return
res.status(401).send(‘Invalid LTI launch request.’); }

    // Log some info for your testing
    console.log('Valid LTI launch!');
    console.log('User:', provider.userId);
    console.log('Roles:', provider.roles);
    console.log('Context:', provider.context_title);

    // Redirect to your GitHub Pages site
    res.writeHead(303, { Location: redirectUrl });
    res.end();

}); };
