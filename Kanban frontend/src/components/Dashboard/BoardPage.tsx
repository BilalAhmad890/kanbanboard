import { Loader2, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BoardForm } from "@/components/Dashboard/BoardForm";
import { useState } from "react";
import { toast } from "sonner";
import { useDashboardContext } from "./DashboardContext";
import { capitalizeFirstChar } from "@/lib/capitalizeFirstChar";
import { BoardDto, TimeFrame } from "@/Types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/lib/Api";
import { formattedDate } from "@/lib/formattedDate";
import { useIsAuthenticated } from "@/lib/isUser";
import { useBoardContext } from "./BoardContext";
import BoardCard from "@/components/Dashboard/BoardCard";
import { startOfToday, startOfWeek, subWeeks, isAfter, isBefore, isToday } from "date-fns";
import { convertFirstNameToLowerCase } from "@/lib/FirstNameConverterToLowerCase";

const BoardPage = () => {
  const queryClient = useQueryClient();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, isLoading: isUserLoading } = useDashboardContext();
  const { boards, isLoading: isBoardDataLoading, isError, error } = useBoardContext();
  const { refetch } = useIsAuthenticated();
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("today");
  const [globalError, setGlobalError] = useState<string>("");
  
  const isLoading = isUserLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Something went wrong</p>
      </div>
    );
  }

  const username = user?.userName;
  const capitalizedUsername = capitalizeFirstChar(username);

  const name =
    user && typeof username === "string"
      ? convertFirstNameToLowerCase(username)
      : "";

  const { mutate, isPending } = useMutation({
    mutationFn: (values: BoardDto) => post("/boards", values),
    onSuccess: async () => {
      
      await queryClient.invalidateQueries({ queryKey: ["getBoardsWithTasks"] });
      const authData = await refetch();

      if (authData && authData.data?.isAuthenticated) {
        toast("Board created successfully", {
          description: formattedDate,
        });
        setIsSheetOpen(false);
      } else {
        toast("Could not create the board. Please try again.", {
          description: formattedDate,
          duration: 2500,
          dismissible: true,
          className: "text-red-400",
        });
      }
    },
    onError: (error: any) => {
      if (error.errors) {
        const errorMessage = error.errors[0].description;
        setGlobalError(errorMessage);
      } else if (typeof error === "string") {
        setGlobalError(error);
      } else {
        setGlobalError("An unexpected error occurred. Please try again.");
      }
    },
  });

  const handleCreateBoard = (values: BoardDto) => {
    mutate(values);
  };

  const timeFrameOptions = [
    { value: "today", label: "Today" },
    { value: "this-week", label: "This Week" },
    { value: "last-week", label: "Last Week" },
  ];

  const filterBoardsByTimeFrame = (timeFrame: TimeFrame) => {
    const today = startOfToday();
    const thisWeekStart = startOfWeek(today);
    const lastWeekStart = subWeeks(thisWeekStart, 1);

    return boards?.filter(board => {
      const boardDate = new Date(board.created);
      
      switch (timeFrame) {
        case "today":
          return isToday(boardDate);
        case "this-week":
          return isAfter(boardDate, thisWeekStart) || isToday(boardDate);
        case "last-week":
          return isAfter(boardDate, lastWeekStart) && isBefore(boardDate, thisWeekStart);
        default:
          return false;
      }
    });
  };

  const renderTimeFrameContent = (timeFrame: TimeFrame) => {
    const filteredBoards = filterBoardsByTimeFrame(timeFrame);

    return (
      <div className="p-6 h-full">
        <h3 className="font-semibold text-xl mb-4">
          {timeFrameOptions.find((t) => t.value === timeFrame)?.label}
        </h3>
        {filteredBoards?.length === 0 ? (
          <div className="min-h-[200px] flex items-center justify-start text-muted-foreground">
            No boards for {timeFrameOptions.find((t) => t.value === timeFrame)?.label.toLowerCase()}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBoards?.map((board) => (
              <BoardCard
                key={board.id}
                title={board.title}
                description={board.description}
                date={new Date(board.created)}
                userName={name}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-10 px-4 md:px-16 h-screen w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-2xl md:text-3xl">{`${capitalizedUsername}'s Board`}</h1>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button className="flex items-center">
              <PlusIcon className="h-4 w-4 mr-2" />
              Create New Board
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Create New Board</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <BoardForm
                onSubmit={handleCreateBoard}
                onCancel={() => setIsSheetOpen(false)}
                globalError={globalError}
                isPending={isPending}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Select */}
      <div className="lg:hidden mb-6">
        <Select
          value={selectedTimeFrame}
          onValueChange={(value) => setSelectedTimeFrame(value as TimeFrame)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select time frame" />
          </SelectTrigger>
          <SelectContent>
            {timeFrameOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mobile View - Single Grid */}
      <div className="lg:hidden">
        {renderTimeFrameContent(selectedTimeFrame)}
      </div>

      {/* Desktop View - Three Grids */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {timeFrameOptions.map((option) => (
          <div key={option.value}>
            {renderTimeFrameContent(option.value as TimeFrame)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BoardPage;