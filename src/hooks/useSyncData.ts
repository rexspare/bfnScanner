import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCheckInternetConnection from "./useCheckInternetConnection";

type DataType = {
  access_date: string;
  access_time: string;
  acs_system: string;
  area_id: string;
  barcode_id: string;
  block: string;
  coding: string;
  end_date: string;
  end_time: string;
  event_id: string;
  gameday: string;
  gameserial: string;
  group_ticket: boolean;
  id: number;
  ident_no_acs: string;
  number_of_entries: number;
  number_of_remaining_entries: number;
  owner_name: string;
  owner_number: string;
  owner_picture: string;
  person_category: string;
  reservation_line: number;
  reservation_number: string;
  row: string;
  season_ticket: boolean;
  seat: string;
  serial: string;
  start_date: string;
  start_time: string;
  to_synchronize: boolean;
  utid: string;
}

type SyncData = {
  syncData: () => void;
  syncSettings: (device: string, mandant: string) => Promise<Settings | null>;
  removeData: () => void;
  updateNumberOfRemainingEntries: (ticket: {
    id: string;
    number_of_remaining_entries: number;
  }) => void;
  checkData: (id: string) => DataType | null | undefined;
  saveDataOnDevice: (data: DataType[]) => void;
  hasDownloadedData: () => {
    savedData: boolean,
    localData: boolean
  };
  loading: boolean;
  error: any;
  data: DataType[];
  settings: Settings | null;
  offlineData: DataType[];
}

type Settings = {
  entranceName: string;
  gateName: string;
  description1: string;
  description2: string;
  exit: boolean;
  test: boolean;
}

/**
 * Hook which allows to synchronize data with the server.
 * It is used to synchronize data with the server.
 *
 * @author Julien Tietke <julien.tietke.m@gmail.com>
 */
const useSyncData = (device: string, mandant: string, url: string): SyncData => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<DataType[]>([]);

  // Data to be saved on the device when the user is offline and sync it when the user is online.
  const [offlineData, setOfflineData] = useState<DataType[]>([]);

  const [settings, setSettings] = useState<Settings | null>(null);

  const isConnected = useCheckInternetConnection();

  // Event listener to check if the user is back online.
  useEffect(() => {
    syncData();

    if (isConnected) {
      uploadOfflineData();
      console.log("isConnected", isConnected);
    }
  }, [isConnected]);

  useEffect(() => {
    if (device && mandant) {
      syncSettings(device, mandant);
    }

  }, [device, mandant, isConnected]);

  // Hydrate the offline data from the storage.
  useEffect(() => {
    AsyncStorage.getItem("async")
      .then((savedData) => {
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setOfflineData(parsedData);
        }
      })
  }, []);

  useEffect(() => {
    if (offlineData.length > 0) {
      saveDataOnDevice(offlineData, "async");
    }
  }, [offlineData]);

  /**
   * Upload the offline data to the server.
   * This function is used to upload the offline data to the server when the user is back online.
   * When the data is uploaded, it is removed from the offline data.
   */
  const uploadOfflineData = async () => {
    let asyncData = offlineData;

    console.log("asyncData", 'start');

    for (const ticket of asyncData) {
      console.log("syncing ticket", ticket);
      try {
        const response = await updateTicket(ticket);
        if (response.status === 200) {
          console.log("ticket synced");
          const newOfflineData = asyncData.filter((t: DataType) => t.barcode_id !== ticket.barcode_id);
          asyncData = newOfflineData;
          console.log("asyncData", asyncData);
        } else {
          const newOfflineData = asyncData.filter((t: DataType) => t.barcode_id !== ticket.barcode_id);
          asyncData = newOfflineData;
          console.error("Error syncing ticket", response);
        }
      } catch (error) {
        console.error("Error syncing ticket", error);
      }
      console.log("asyncData2", asyncData);
    }

    console.log("end", asyncData);

    setOfflineData(asyncData);
    saveDataOnDevice(asyncData, "async");
  };

  /**
   * Call the server to update the ticket.
   * This function is used to update the number of remaining entries of a ticket.
   * @param ticket
   */
  const updateTicket = (ticket: DataType) => {
    return fetch(`${url}/mobile/entry`, {
      method: "PUT",
      headers: {
        Authorization:
          'sYFnTORCM03hplg4O95c1Z5fvMFXJppLXByKkzwHjc3oEkMSpMxdnGuQbVTQ8OX5',
        'Content-Type': 'text/plain',
      },
      body: `{"barcode": "${ticket.barcode_id}","device":"${device}","mandant": "${mandant}","status": "0"}`,
    });
  };

  /**
   * Update the number of remaining entries of a ticket.
   * After the ticket is scanned, the number of remaining entries is updated.
   * The ticket is also saved on the device.
   * @param ticket
   */
  const updateNumberOfRemainingEntries = (ticket: {
    id: string;
    number_of_remaining_entries: number;

  }) => {
    let localData = data;
    setLoading(true);

    if (localData.length > 0) {
      let index = localData.findIndex((t: DataType) => t.barcode_id === ticket.id);

      if (index !== -1) {
        localData[index].number_of_remaining_entries = ticket.number_of_remaining_entries;
      }
    }

    setData(localData);
    saveDataOnDevice(localData);
    setLoading(false);
  };

  /**
   * Update the local and storage ticket.
   * The ticket is updated in the local state and saved on the device.
   * @param ticket
   */
  const updateLocalAndStorageTicket = (ticket: DataType) => {
    setLoading(true);
    let localData = data;


    if (localData.length > 0) {
      let index = localData.findIndex((t: DataType) => t.barcode_id === ticket.barcode_id);

      if (index !== -1) {
        localData[index] = ticket;
      } else {
        localData = [
          ...localData,
          ticket,
        ];
      }
    } else {
      localData = [
        ...localData,
        ticket,
      ];
    }

    setData(localData);
    saveDataOnDevice(localData);
    setLoading(false);
  };

  // TODO replace urls
  const syncSettings = (device: string, mandant: string) => {
    setLoading(true);

    if (!isConnected) {
      AsyncStorage.getItem("settings")
        .then((savedSettings) => {
          if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings);
            setSettings(parsedSettings);
            setLoading(false);
            return Promise.resolve(parsedSettings as Settings);
          }
        })

      setLoading(false);
      return Promise.resolve(null);
    }

    return fetch(`${url}/mobile/settings`, {
      method: "PUT",
      headers: {
        Authorization:
          "sYFnTORCM03hplg4O95c1Z5fvMFXJppLXByKkzwHjc3oEkMSpMxdnGuQbVTQ8OX5",
        "Content-Type": "text/plain",
      },
      body: `{"device":"${device}","mandant": "${mandant}"}`,
    })
      .then((response) => response.json())
      .then((json) => {
        let data = JSON.parse(JSON.stringify(json));
        let entranceName = data.ReaderArr.item.entranceName;
        let gateName = data.ReaderArr.item.gatename;
        let description1 = data.ReaderArr.item.description1;
        let description2 = data.ReaderArr.item.description2;
        let exit = data.ReaderArr.item.exitMode;
        let test = data.ReaderArr.item.testMode;

        const settings: Settings = {
          entranceName: entranceName,
          gateName: gateName,
          description1: description1,
          description2: description2,
          exit: exit,
          test: test,
        };

        saveSettingsOnDevice(settings);
        setSettings(settings);

        setLoading(false);
        return settings;
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching settings:", error);
        setError(error);

        return null;
      });
  };

  const syncData = async () => {
    setLoading(true);

    if (!isConnected) {
      if (hasDownloadedData().savedData) {
        AsyncStorage.getItem("tickets")
          .then((savedData) => {
            if (savedData) {
              const parsedData = JSON.parse(savedData);
              setData(parsedData);
              setLoading(false);
            }
          })
      }

      setLoading(false);
      return null;
    }

    return fetch(`${url}/api/whitelist`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer M2ZmYzE5ZjBkYmNiYzEwNWUzYzlhNzY2ZGU2NTNmYzA3YzMwYjljZTM0MzdiNDBiZTdiOTYxZDIwNWY3NmE3Nw",
        "Content-Type": "text/plain",
      },
    })
      .then((response) => response.text())
      .then((content) => {
        let data = JSON.parse(content);

        setData(data.data);
        saveDataOnDevice(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  };

  /**
   * Remove the data from the device.
   */
  const removeData = () => {
    setLoading(true);
    setError(null);
    setSettings(null);
    setOfflineData([]);
    setData([]);
    AsyncStorage.removeItem("tickets");
    AsyncStorage.removeItem("tickets_lastSync");
    AsyncStorage.removeItem("async");
    AsyncStorage.removeItem("async_lastSync");
    AsyncStorage.removeItem("settings");
    setLoading(false);
  };

  /**
   * Check if the data is in the data state and if it is valid.
   * @param id
   */
  const checkData = (id: string): DataType | null | undefined => {
    if (data && data.length > 0) {
      let ticket = data.find((ticket: DataType) => ticket.barcode_id === id);

      console.log('tocle', ticket)

      if (ticket) {
        const number_of_remaining_entries = ticket.number_of_remaining_entries;

        if (number_of_remaining_entries > 0) {
          const number_of_entries = ticket.number_of_entries;
          const newNumber_of_remaining_entries = number_of_remaining_entries - 1;

          const newTicket = {
            ...ticket,
            number_of_remaining_entries: newNumber_of_remaining_entries,
            number_of_entries: number_of_entries + 1,
          };


          setOfflineData([...offlineData, newTicket])

          updateLocalAndStorageTicket(newTicket);

          return newTicket;
        } else {
          console.log('Doppelverwendung')
          return null;
        }

        return undefined;
      }
    }

    return undefined;
  };

  /**
   * Save the data on the device.
   * @param data
   * @param key
   */
  const saveDataOnDevice = async (data: DataType[], key: string = "tickets") => {
    setLoading(true);
    if (data) {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      await AsyncStorage.setItem(key + "_lastSync", new Date().toISOString());
    }
    setLoading(false);
  };

  /**
   * Save the settings on the device.
   * @param settings
   */
  const saveSettingsOnDevice = async (settings: Settings) => {
    setLoading(true);
    if (settings) {
      await AsyncStorage.setItem("settings", JSON.stringify(settings));
    }
    setLoading(false);
  };

  /**
   * Check if the data has been downloaded or if it is in the ram.
   */
  const hasDownloadedData = async () => {
    const savedData = await AsyncStorage.getItem("tickets");
    const lastSync = await AsyncStorage.getItem("tickets_lastSync");
    const localData = data.length > 0;

    if (lastSync) {
      const lastSyncDate = new Date(lastSync);
      const currentDate = new Date();
      const diff = currentDate.getTime() - lastSyncDate.getTime();
      const diffInMinutes = diff / 1000 / 60;

      if (diffInMinutes > 60 * 3) {
        return {
          savedData: false,
          localData,
        };
      }
    }

    return {
      savedData: savedData ? JSON.parse(savedData).length > 0 : false,
      localData,
    };
  };

  return {
    syncData,
    syncSettings,
    removeData,
    checkData,
    updateNumberOfRemainingEntries,
    saveDataOnDevice,
    loading,
    offlineData,
    hasDownloadedData,
    settings,
    error,
    data,
  };
};

export default useSyncData;
