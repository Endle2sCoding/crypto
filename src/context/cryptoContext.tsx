import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AssetType, CryptoType, fakeFetchCrypto, fetchAssets } from "../api";
import { percentDifferent } from "../utils/utils";

export type AssetsStateType = AssetType & {
  grow: boolean;
  growPercent: number;
  totalAmount: number;
  totalProfit: number;
  name: string;
};
const CryptoContext = createContext<{
  assets: AssetsStateType[];
  crypto: CryptoType[];
  loading: boolean;
  addAsset: (newAsset: AssetType) => void;
}>({
  assets: [],
  crypto: [],
  loading: false,
  addAsset: () => {},
});

export const CryptoContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<CryptoType[]>([]);
  const [assets, setAssets] = useState<AssetsStateType[]>([]);

  function mapAssets(
    assets: AssetType[],
    result: CryptoType[]
  ): AssetsStateType[] {
    return assets.map((asset: AssetType) => {
      const coin = result.find(
        (c: CryptoType) => c.id === asset.id
      ) as CryptoType;
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifferent(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();
      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);
  function addAsset(newAsset: AssetType) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }
  return (
    <CryptoContext.Provider
      value={{
        crypto: crypto,
        assets: assets,
        loading,
        addAsset: addAsset,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
export default CryptoContext;
export function useCrypto(): {
  assets: AssetsStateType[];
  crypto: CryptoType[];
  loading: boolean;
  addAsset: (newAsset: AssetType) => void;
} {
  return useContext(CryptoContext);
}
