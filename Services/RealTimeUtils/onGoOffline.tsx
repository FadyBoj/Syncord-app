import {IUser} from '../../context/DashboardContext';

const onGoOffline = (
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  userId : string
) => {
    setUser((prevData) =>{
        if(!prevData) return null;
        return {
            ...prevData,
            friends:prevData.friends.map((item) =>{
                return item.userId.toString() !== userId ? item:
                {...item,isOnline:false}
            })
        }
    })
};

export default onGoOffline;
