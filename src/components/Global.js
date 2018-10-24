import Expo, {FileSystem,ImagePicker, SQLite} from 'expo'
export default {
    online: true,
    db_prescription : SQLite.openDatabase('proscription.db'),
    db_drug : SQLite.openDatabase('drug.db'),
    share_id :0,
    share_title :null,
    share_url:null,
    share_filepath:null,
    share_navigate : null,
};