const Textarea = ({ disabled = false, className = '', value = '', onChange, ...props }) => (
    <textarea
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
        value={value}
        onChange={onChange}
        {...props}
    />
);

export default Textarea;
