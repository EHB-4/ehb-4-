import Onfido from '@onfido/api';

const onfido = new Onfido({
  apiToken: process.env.ONFIDO_API_TOKEN || '',
  region: 'EU', // or 'US', 'CA' depending on your Onfido account
});

export default onfido; 