
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';


function Notification(message,title,type){


Store.addNotification({
    title:title,
    message:message,
    type:type,
    container:"top-right",
    insert:"top",
    dismiss:{
        duration:2000,
        onScreen:true
    }
})

}


export default Notification