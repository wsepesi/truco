type cChat = {
    msg: string,
}

type sChat = {
    msg: string,
}

export interface ServerToClientEvents {
    noArg: () => void;
    ping: (msg: string) => void;
    chat: (data: sChat) => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
export interface ClientToServerEvents {
    hello: () => void;
    chat: (data: cChat) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
name: string;
age: number;
}
