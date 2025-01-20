enum SCREENS {
    MAIN = "MAIN",
    SETTING = "SETTING"
}

enum ASYNC_KEYS {
    WEB_SERVICE = "@WEB_SERVICE",
    MENDANT = "@MENDANT",
    DEVICE_ID = "@DEVICE_ID",
    PASSWORD = "@PASSWORD",
    WHITE_LIST = "@WHITE_LIST",
    DOWNLOAD_DATA = "@DOWNLOAD_DATA",
    OFFLINE_ENTRIES = "@OFFLINE_ENTRIES",
}


enum ROUTES {

}


enum ALERT_TYPES {
    SUCCESS = 'success',
    WARNING = "error",
    DANGER = "error",
    INFO = "info"
}
enum ALERT_HEADER {
    SUCCESS = 'SUCCESS!',
    WARNING = "WARNING!",
    DANGER = "ERROR!",
    INFO = "INFO"
}


// const WEB_SERVICE = 'https://h2955251.stratoserver.net';
const WEB_SERVICE = 'https://h2885765.stratoserver.net';
const MENDANT = 'BFN_TESTMANDANT';
const DEVICE_ID = '352714114357072';

export {
    SCREENS,
    ASYNC_KEYS,
    ROUTES,
    ALERT_TYPES,
    ALERT_HEADER,
    WEB_SERVICE,
    MENDANT,
    DEVICE_ID
}