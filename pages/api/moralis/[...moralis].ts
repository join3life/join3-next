import { MoralisNextApi } from '@moralisweb3/next';

export default MoralisNextApi({
  apiKey: String(process.env.MORALIS_API_KEY),
  authentication: {
    domain: 'amazing.dapp',
    uri: String(process.env.NEXTAUTH_URL),
    timeout: 120,
  },
});
