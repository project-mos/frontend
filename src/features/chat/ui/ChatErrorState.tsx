import Typography from "@/shared/components/atoms/Typography";
import { ChatErrorStateProps } from "./chat.ui.types";

const ChatErrorState = ({ errorMessage, onRetry }: ChatErrorStateProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <i className="bi bi-exclamation-triangle mb-4 text-4xl text-red-500" />
      <Typography.P2 className="mb-4 text-gray-600">{errorMessage}</Typography.P2>
      <button 
        onClick={onRetry}
        className="rounded-lg bg-mos-main px-4 py-2 text-white hover:bg-mos-main/90"
      >
        다시 시도
      </button>
    </div>
  );
};

export default ChatErrorState;
