import {IUser} from '../../context/DashboardContext';

interface payload {
  friendId: string;
  imageUrl: string;
}

const onFriendUpdatedPfp = (
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  date: payload,
) => {
  setUser(prevData => {
    if (!prevData) return null;
    return {
      ...prevData,
      friends: prevData.friends.map(item => {
        return item.userId.toString() !== date.friendId.toString()
          ? item
          : {
              ...item,
              image: date.imageUrl,
            };
      }),
    };
  });
};

export default onFriendUpdatedPfp;
