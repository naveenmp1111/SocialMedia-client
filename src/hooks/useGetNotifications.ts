import { getNotifications } from "../api/notfication"
import useConversation from "../zustand/useConversation"
import { useEffect } from 'react'

const useGetNotifications = () => {

    const { notifications, setNotifications, reload } = useConversation()
    useEffect(() => {
        const GetNotifications = async () => {
            try {
                const response = await getNotifications()
                //  console.log('response from get notificaoins is ',response)
                setNotifications(response.notifications)
            } catch (error) {
                console.log('error in getting messages ', error)
            }
        }
        GetNotifications()
    }, [reload])

    return { notifications }
}
export default useGetNotifications