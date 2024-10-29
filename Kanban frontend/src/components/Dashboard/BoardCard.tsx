import { Card } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { UserAvatar } from "./UserAvatar";

export interface IBoardCardProps {
  title: string;
  description: string;
  date: Date;
  userName: string;
}

const BoardCard = ({ title, description, date, userName }: IBoardCardProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
        {userName && (
          <UserAvatar seed={userName} name={userName} />
        )}
      </div>
      <div className="flex items-center text-muted-foreground text-sm">
        <CalendarIcon className="h-4 w-4 mr-2" />
        <time dateTime={date.toISOString()}>{format(date, 'MMM d, yyyy')}</time>
      </div>
    </Card>
  );
};

export default BoardCard;