interface InputFieldProps {
  title: string;
  error?: string;
  children: React.ReactNode;
}
const InputField = ({ title, error, children }: InputFieldProps) => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-end">
      <label className="text-body3 font-label pb-1">{title}</label>
      {error && <p className="text-red text-caption1 font-paragraph">* {error}</p>}
      </div>
      {children}
    </div>
  );
};
export default InputField;