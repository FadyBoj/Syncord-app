import {IUser} from '../../context/DashboardContext';



const onRequestRejected = (
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  requestId: string,
) => {
  setUser(prevData => {
    if (!prevData) return null;
    return {
      ...prevData,
      requests:prevData.requests.filter(r => r.id.toString() !== requestId)
    };
  });
};

export default onRequestRejected;
