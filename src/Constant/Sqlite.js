import SQLite from 'react-native-sqlite-storage'
const db = SQLite.openDatabase({
    name: 'gochat.db',
    location: 'default',
});
export { db }