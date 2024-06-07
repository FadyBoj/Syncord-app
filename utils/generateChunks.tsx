import getMonth from './getMonth';

interface Chunk {
  userId: string;
  messages: {id: string; text: string; createdAt: string}[];
  timestampSpace: string | boolean;
  id: string;
}

interface Message {
  id: string;
  isSent: boolean;
  text: string;
  createdAt: Date;
  senderId: string;
}

const generateChunks = (messages: Message[]) => {
  let tempChunks: Chunk[] = [];
  messages.map((message, index) => {
    const lastMessage =
      tempChunks.length > 0 &&
      tempChunks[tempChunks.length - 1].messages[
        tempChunks[tempChunks.length - 1].messages.length - 1
      ];

    //If the chunk empty
    if (tempChunks.length == 0) {
      const newChunk: Chunk = {
        id: message.id,
        userId: message.senderId.toString(),
        messages: [
          {
            id: message.id,
            text: message.text,
            createdAt: message.createdAt.toString(),
          },
        ],
        timestampSpace: false,
      };
      tempChunks.push(newChunk);
    } else if (
      lastMessage &&
      (getMonth(message.createdAt.toString()).month.toString() !==
        getMonth(lastMessage.createdAt).month.toString() ||
        getMonth(message.createdAt.toString()).year.toString() !==
          getMonth(lastMessage.createdAt).year.toString() ||
        getMonth(message.createdAt.toString()).day.toString() !==
          getMonth(lastMessage.createdAt).day.toString())
    ) {
      const newChunk: Chunk = {
        id: message.id,

        userId: message.senderId,
        messages: [
          {
            id: message.id,
            text: message.text,
            createdAt: message.createdAt.toString(),
          },
        ],
        timestampSpace: message.createdAt.toString(),
      };
      tempChunks.push(newChunk);
    } else {
      // Adding message to an existing chunk
      const lastIndex = tempChunks.length - 1;
      if (tempChunks[lastIndex].userId === message.senderId) {
        tempChunks[lastIndex] = {
          ...tempChunks[lastIndex],
          messages: [
            tempChunks[lastIndex].messages.flat(),
            {
              id: message.id,
              text: message.text,
              createdAt: message.createdAt.toString(),
            },
          ].flat(),
        };
        //Adding new chunk beside the previous chunks
      } else {
        const newChunk: Chunk = {
          id: message.id,

          userId: message.senderId,
          messages: [
            {
              id: message.id,
              text: message.text,
              createdAt: message.createdAt.toString(),
            },
          ],
          timestampSpace: false,
        };
        tempChunks.push(newChunk);
      }
    }
  });

  return tempChunks;
};

export default generateChunks;
