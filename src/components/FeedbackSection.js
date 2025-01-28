import moment from 'moment';

const FeedbackSection = ({ feedback }) => {

    const formatDate = (dateString) => {
        return moment(dateString).format('MMM D, YYYY hh:mm');
    };

    return (
        <article className="pt-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                        alt='' />{feedback.user.name}</p>

                    <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">{formatDate(feedback.created_at)}</time></p>
                </div>

            </footer>
            <h1>Title : {feedback.title}</h1>
            <h1>Category : {feedback.category}</h1>
            <p className="mt-2 ml-1 text-gray-500 dark:text-gray-400">{feedback.description}</p>
        </article>

    )
};

export default FeedbackSection;