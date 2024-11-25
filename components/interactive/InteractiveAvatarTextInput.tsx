import { Input, Spinner, Tooltip } from "@nextui-org/react";
import { Airplane, ArrowRight, PaperPlaneRight } from "@phosphor-icons/react";
import clsx from "clsx";

interface StreamingAvatarTextInputProps {
  label: string;
  placeholder: string;
  input: string;
  onSubmit: () => void;
  setInput: (value: string) => void;
  endContent?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export default function InteractiveAvatarTextInput({
  label,
  placeholder,
  input,
  onSubmit,
  setInput,
  endContent,
  disabled = false,
  loading = false,
}: StreamingAvatarTextInputProps) {
  function handleSubmit() {
    if (input.trim() === "") {
      return;
    }
    onSubmit();
    setInput("");
  }

  return (
    <Input
      endContent={
        <div className="flex h-full flex-row items-center">
          {endContent}
          <Tooltip content="Send message">
            {loading ? (
              <Spinner
                className="text-indigo-300 hover:text-indigo-200"
                size="sm"
                color="default"
              />
            ) : (
              <>
                <button
                  type="button"
                  aria-label="Clear input"
                  className="focus:outline-none"
                  onClick={() => setInput("")}
                >
                  <div className="text-indigo-300 hover:text-indigo-200">
                    <span className="material-icons">clear</span>
                  </div>
                </button>
                <button
                  type="submit"
                  className="focus:outline-none"
                  onClick={handleSubmit}
                >
                  <div
                    className={clsx(
                      "text-indigo-300 hover:text-indigo-200",
                      disabled && "opacity-50",
                    )}
                  >
                    <PaperPlaneRight size={24} />
                  </div>
                </button>
              </>
            )}
          </Tooltip>
        </div>
      }
      label={label}
      placeholder={placeholder}
      size="sm"
      value={input}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit();
        }
      }}
      onValueChange={setInput}
      isDisabled={disabled}
    />
  );
}
