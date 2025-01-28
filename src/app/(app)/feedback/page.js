'use client';

import Header from '@/app/(app)/Header';
import CommentSection from '@/components/CommentSection';
import { useAuth } from '@/hooks/auth';
import useFeedback from '@/hooks/useFeedback';

import FeedbackSection from '@/components/FeedbackSection';
import FeedbackForm from '@/components/FeedbackForm';
import { useState } from 'react';

const Feedback = () => {
    const { user } = useAuth({ middleware: 'auth' });
    const { feedbacks, loading, error, submitFeedback } = useFeedback();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const feedbacksPerPage = 5;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFeedback({
            title: formData.title,
            description: formData.description,
            category: formData.category
        });

        setFormData({
            title: '',
            description: '',
            category: ''
        });
    };

    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);

    return (
        <>
            <Header title="Feedback" />
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div className="max-w-2xl mx-auto px-4">
                    <FeedbackForm 
                    formData={formData} 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} 
                    />

                    <h1>Feedback</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {
                        currentFeedbacks.map(feedback => (
                            <div key={feedback.id}>
                                <FeedbackSection feedback={feedback} />
                                <CommentSection feedbackId={feedback.id} comments={feedback.comments} />
                            </div>
                        ))
                    }

                    <div className="pagination p-1">
                        {Array.from({ length: totalPages }, (_, index) => 
                        (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-1 m-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Feedback;
