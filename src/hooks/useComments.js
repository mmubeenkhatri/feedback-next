import axios from '@/lib/axios';
import { useState, useEffect } from 'react';

const useComments = (feedbackId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitComment = async (commentData) => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/comment`, commentData);
            if(response.statusText == 'OK')
                setComments(prevComments => [...prevComments, response.data.comment]);
            return response.data.comment
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        
    };

    return { comments, loading, error, submitComment };
};

export default useComments;
