import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {
    const requests = useSelector(store => store.requests);
    const dispatch = useDispatch();

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/requests/received', {withCredentials: true});
            console.log(res.data.data);
            dispatch(addRequests(res?.data?.data));
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if(!requests) return;

    if(requests?.length === 0) return <h1 className='text-bold text-2xl'>No Requests Found</h1>;

    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-white text-3xl'>Connection Requests</h1>
            {
                requests?.map((request) => {
                    const {_id, firstName, lastName, photoUrl, age, about} = request.fromUserId;
                    return (
                        <div className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-200 w-2/3 mx-auto" key={_id}>
                            <div>
                                <img alt='photo' src={photoUrl} className='w-20 h-20 rounded-full' />
                            </div>
                            <div className='text-left mx-4'>
                                <h2 className='font-bold text-xl'>{firstName + ' ' + lastName}</h2>
                                {age && <p>{age}</p>}
                                <p>{about}</p>
                            </div>
                            <div>
                                <button className="btn btn-primary mx-2">Reject</button>
                                <button className="btn btn-secondary mx-2">Accept</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Requests