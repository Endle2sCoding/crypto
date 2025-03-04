import { createContext, ReactNode, useEffect, useState } from "react";
import { AssetType, CryptoType, fakeFetchCrypto, fetchAssets } from "../api";
import { percentDifferent } from "../utils/utils";

type AssetsStateType = AssetType & {
  grow: boolean;
  growPercent: number;
  totalAmount: number;
  totalProfit: number;
};
const CryptoContext = createContext<{
  assets: AssetsStateType[];
  crypto: CryptoType[];
  loading: boolean;
}>({
  assets: [],
  crypto: [],
  loading: false,
});

export const CryptoContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<CryptoType[]>([]);
  const [assets, setAssets] = useState<AssetsStateType[]>([]);
  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();
      setAssets(
        assets.map((asset: AssetType) => {
          const coin = result.find(
            (c: CryptoType) => c.id === asset.id
          );
          return {
            grow: coin ? asset.price < coin.price : false,
            growPercent: coin ? percentDifferent(asset.price, coin.price) : 0,
            totalAmount: coin ? asset.amount * coin.price : 0,
            totalProfit: coin
              ? asset.amount * coin.price - asset.amount * asset.price
              : 0,
            ...asset,
          };
        })
      );
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);
  return (
    <CryptoContext.Provider
      value={{
        crypto: crypto,
        assets: assets,
        loading,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
export default CryptoContext;
