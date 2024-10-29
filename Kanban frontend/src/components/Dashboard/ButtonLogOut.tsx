import { post } from '@/lib/Api';
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { formattedDate } from "@/lib/formattedDate";
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from '@/lib/isUser';

const ButtonLogOut = () => {
    const navigate = useNavigate();
    const { refetch } = useIsAuthenticated();
    const { mutate, isPending } = useMutation({
        mutationFn: () => post('/logout', {}), 
        onSuccess: async () => {
           
            const authData = await refetch(); 

            if (!authData.data?.isAuthenticated) {
                toast("Logged out successfully!", {
                    description: formattedDate,
                    duration: 2500,
                    dismissible: true,
                }); 
                navigate("/"); 
            }
        },
        onError: (error) => {
            console.log("An unexpected error occurred during logout. Please try again.", error.message);
        },
    });

    const handleLogout = () => {
        mutate(); 
    };

    return {handleLogout, isPending}
}

export default ButtonLogOut;