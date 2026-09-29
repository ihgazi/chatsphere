interface TextFieldProps {
    title: string,
    value: string,
    setValue: (value: string) => void,
    type?: string
}

const TextField: React.FC<TextFieldProps> = ({ title, value, setValue, type = "text" }) => {
    return (
        <input
            type={type}
            placeholder={title}
            className="p-3 mt-8 rounded-md border border-grey focus:outline-none focus:border-blue"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default TextField;
