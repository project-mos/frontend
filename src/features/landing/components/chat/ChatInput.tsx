import Button from "@/shared/components/atoms/Button";
import Input from "@/shared/components/atoms/Input";
import React from "react";

const ChatInput = () => {
  return (
    <form
      className="flex w-full gap-2  border-gray-200 p-3 text-black"
      onSubmit={(event) => {
        console.log("submit");
        event.preventDefault();
      }}
    >
      <Input
        type="text"
        className="w-full flex-1 rounded-full border px-3 py-2 text-sm focus:outline-none"
        placeholder="메시지를 입력하세요..."
      />
      <Button.Default
        type="submit"
        className="rounded-full bg-mos-main px-3 py-2.5 text-sm text-white "
      >
        <i className="bi bi-send" />
      </Button.Default>
    </form>
  );
};

export default ChatInput;
