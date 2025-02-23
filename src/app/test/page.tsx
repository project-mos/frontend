import Typography from "@/components/atoms/Typography";

export default function TestPage() {
  return (
    <div className="flex h-200 items-center justify-center border-10 border-red-500 bg-white text-black">
      <Typography.Head1>example Head1</Typography.Head1>
      <Typography.Head2>example Head2</Typography.Head2>
      <Typography.Head3>example Head3</Typography.Head3>
      <Typography.SubTitle1>example SubTitle1</Typography.SubTitle1>
      <Typography.P1>example P1</Typography.P1>
      <Typography.P2>example P2</Typography.P2>
      <Typography.P3 className="text-blue-500">example P3</Typography.P3>
    </div>
  );
}
