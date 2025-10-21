import { Client, IMessage } from "@stomp/stompjs";

let client: Client | null = null;

export const connectLikesSocket = (onLikeUpdate: (data: { postId: number; likes: number }) => void) => {
  client = new Client({
    brokerURL: "ws://localhost:8080/ws",
    onConnect: () => {
      console.log("✅ WebSocket conectado");
      client?.subscribe("/topic/likes", (message: IMessage) => {
        const data = JSON.parse(message.body);
        onLikeUpdate(data);
      });
    },
    debug: (str) => console.log(str),
  });

  client.activate();
};

export const disconnectLikesSocket = () => {
  client?.deactivate();
};
