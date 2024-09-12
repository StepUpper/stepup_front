interface InputFieldProps {
  title: string;
  error?: string;
  children: React.ReactNode;
}
const InputField = ({ title, error, children }: InputFieldProps) => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex items-end justify-between">
        <label className="pb-1 text-body3 font-label">{title}</label>
        {error && (
          <p className="text-caption1 font-paragraph text-red">* {error}</p>
        )}
      </div>
      {children}
    </div>
  );
};
export default InputField;
