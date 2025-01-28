import { useAuth } from "@/hooks/auth";
import useComments from "@/hooks/useComments";
import { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import InputError from "./InputError";
import Button from "./Button";
import moment from "moment";


const CommentSection = ({ feedbackId, comments}) => {
    const { loading, error, submitComment } = useComments(feedbackId);

    const [feedbackComments, setFeedbackComments] = useState(comments);

    const [formData, setFormData] = useState({
        commentMessage: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await submitComment({
                commentMessage: formData.commentMessage,
                feedbackId: feedbackId,
            });

            setFeedbackComments(prevFeedback => [
                response, ...prevFeedback
            ]);

            setFormData({ commentMessage: '' });

        } catch (error) {
            setError('Failed to submit comment. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        return moment(dateString).format('MMM D, YYYY hh:mm');
    };

    return (
        <>
            <div className="p-6 mb-3 ml-6 mb-6" >
                <div className="">
                    <Label htmlFor="title">Comment</Label>
                    <Input
                        id="commentMessage"
                        type="text"
                        name='commentMessage'
                        value={formData.commentMessage}
                        className="block mt-1 w-full"
                        onChange={handleChange}
                        required
                    />
                    <InputError messages='' className="mt-2" />
                </div>
                <div className="mt-2 float-right" >
                    <Button onClick={handleSubmit}>Add</Button>
                </div>
            </div>
            <div className="pl-6 mb-3 ml-6 ">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
            </div>
            {
                feedbackComments.map(comment => (
                    <article className="pl-6 mb-3 ml-6 text-base bg-white rounded-lg dark:bg-gray-900">
                        <section className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    alt="" />{comment.user.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(comment.created_at)}</p>
                            </div>
                        </section>
                        <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
                    </article>
                ))
            }

        </>
    );
}

export default CommentSection
