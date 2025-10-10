type TextareaProps = {
  value: string;
  setValue: (val: string) => void;
  maxLength: number;
};

export function Textarea({ value, setValue, maxLength }: TextareaProps) {
  return (
    <div className="mb-4">
      <textarea
        rows={3}
        className="border w-full rounded p-2 focus:ring-2 focus:ring-violet-400 outline-none"
        placeholder="Enter order description..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength}
      />
      <div className="flex">
        <span className="ml-auto text-xs text-gray-500">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
