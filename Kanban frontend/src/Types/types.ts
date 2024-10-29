export interface LoginDto {
    email: string;
    password: string;
  }

  export interface RegisterDto {
    username: string;
    email: string;
    password: string;
  }

  export interface TaskDto {
    title: string;
    status: string;
    description: string;
    linkUrl?: string;
    linkName?: string;
  }

  export interface BoardDto {
    title: string;
    description: string;
  }


  export interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    collapsed: boolean;
    route : string;
  }


  export interface ProtectedRouteProps {
    children: JSX.Element;
    redirectTo?: string;
    isDashboardRoute?: boolean;
}

export type TimeFrame = "today" | "this-week" | "last-week";


export interface CheckAuthResponse {
  isAuthenticated: boolean;
  user: any;
}

export interface IBoardWithTasks {
  id: number;
  title: string;
  description: string;
  created: Date; 
  tasks: ITask[];
}


export interface ITask {
  id: number;
  title: string;
  description: string;
  linkUrl: string;
  linkName: string;
  dateAndTime: Date; 
  status: string;
}

export interface BoardContextType {
  boards: IBoardWithTasks[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}