import { MoralisNextApi } from "@moralisweb3/next";

export default MoralisNextApi({ apiKey: String(process.env.MORALIS_API_KEY) });