export interface Comment {
  id: number;
  email: string;
  comment: string;
  createdAt: string;
  replies?: Reply[];
}

export interface Reply {
  id: number;
  email: string;
  reply: string;
  createdAt: string;
}

export interface DataForm {
  comment: string;
  email: string;
  id?: number;
}

export interface ErrorAlert {
  msg?: string;
  status?: boolean;
  title?: string;
  error?: boolean;
}

export interface Axioserror {
  response: {
    data: {
      msg: string;
    };
  };
}
