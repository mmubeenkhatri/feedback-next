import Button from '@/components/Button';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import Textarea from '@/components/textarea';
import useFeedback from '@/hooks/useFeedback';
import { useState } from 'react';

const FeedbackForm = ({formData, handleChange, handleSubmit}) => {

    const categoryList = ['Bug report', 'Feature request', 'Improvement', 'Other'];

    return (
        <>
            <form className="mb-6" onSubmit={handleSubmit}>
                <div className="mb-4 ">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        name='title'
                        value={formData.title}
                        className="block mt-1 w-full"
                        onChange={handleChange}
                        required
                    />
                    <InputError messages='' className="mt-2" />
                </div>

                <div className="mb-4 ">
                    <Label htmlFor="email">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        className="mt-1 block w-full"
                        value={formData.description}
                        rows="4"
                        placeholder="Enter your description here..."
                        onChange={handleChange}
                        required

                    />
                </div>

                <div className="mb-4 ">
                    <Label htmlFor="email">category</Label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" disabled>Choose a category</option>
                        {
                            categoryList.map((category, index) => (
                                <option value={category} key={index}>
                                    {category}
                                </option>
                            ))
                        }
                    </select>
                </div>

                        
                <Button>Send</Button>


            </form>
        </>
    )
};

export default FeedbackForm;