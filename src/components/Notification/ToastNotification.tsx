import React from 'react'
import { toast } from 'react-toastify'

interface INotificationProps {
    position: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center",
    message: string,
    type: "success" | "info" | "error" | "warning"
}

const Notification = (notificationData: INotificationProps ) => {

    switch(notificationData.type) {
        case "success": return toast.success(notificationData.message, {position: notificationData.position})
        case "info": return toast.info(notificationData.message, {position: notificationData.position})
        case "error": return toast.error(notificationData.message, {position: notificationData.position})
        case "warning": return toast.warning(notificationData.message, {position: notificationData.position})
        default: return null;
    }
}
 
export default Notification;