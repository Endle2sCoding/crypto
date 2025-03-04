import { cryptoAssets, cryptoData } from "./data";


export type AssetType = {
  id: string;
  amount: number;
  price: number;
  date: Date;
};
export type CryptoType = {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  priceBtc: number;
  volume: number;
  marketCap: number;
  availableSupply: number;
  totalSupply: number;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
  redditUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  contractAddress?: string;
  decimals?: number;
  explorers?: string[];
};
export type MetaType = {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export function fakeFetchCrypto() {
  return new Promise<{ result: CryptoType[], meta: MetaType; }>((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 1);
  });
}
export function fetchAssets() {
  return new Promise<AssetType[]>((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1);
  });
}