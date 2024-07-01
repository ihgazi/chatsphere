interface InputButtonProps {
    title: string;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
};

const InputButton: React.FC<InputButtonProps> = ({ title, handleSubmit }) => {
    return (
        <button
            className="p-3 mt-6 bg-blue rounded-md font-bold text-white"
            type="submit"
            onClick={handleSubmit}
        >
            {title}
        </button>
    );
};

export default InputButton;
