import {IUser} from '../../context/DashboardContext';

const onFriendRemoved = (
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  friendshipId: string,
) => {
  setUser(prevData => {
    if (!prevData) return null;
    return {
      ...prevData,
      friends: prevData.friends.filter(
        f => f.friendShipId.toString() !== friendshipId.toString(),
      ),
    };
  });
};

export default onFriendRemoved;
