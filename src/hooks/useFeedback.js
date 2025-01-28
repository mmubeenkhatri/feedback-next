import { useState, useEffect } from 'react';
import axios from '@/lib/axios'





const useFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/feedback');
                setFeedbacks(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchFeedbacks();
    }, []);

    const submitFeedback = async (feedbackData) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/feedback', feedbackData);
            if(response.statusText == 'OK')
                setFeedbacks(prevFeedback => [response.data.feedback, ...prevFeedback]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { feedbacks, loading, error, submitFeedback };
};

export default useFeedback;
