import { useEffect, useState } from "react";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

const useCheckInternetConnection = () => {
  const netInfo = useNetInfo();
  const [isConnected, setIsConnected] = useState(netInfo.isConnected || false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected || false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
}

export default useCheckInternetConnection;
