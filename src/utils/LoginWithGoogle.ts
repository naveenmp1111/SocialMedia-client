import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../api/firebase'
import { loginUsingGoogle } from '../api/auth';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const LoginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider)

        const user = result.user
        if (user) {
            const response = await loginUsingGoogle({
                name: user?.displayName as string,
                email: user?.email as string
            })
            return response
        }

    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message)
        }
    }
}

export default LoginWithGoogle