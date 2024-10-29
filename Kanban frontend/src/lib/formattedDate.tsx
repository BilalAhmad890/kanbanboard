import { format } from "date-fns";


export const formattedDate = format(new Date(), "EEEE, MMMM dd, yyyy 'at' h:mm a");
