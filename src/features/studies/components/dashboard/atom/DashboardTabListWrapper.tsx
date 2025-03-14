const DashboardTabListWrapper = ({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="flex gap-3 rounded-md p-3 text-mos-gray-500 transition hover:bg-mos-white-gray-100 hover:text-mos-main-500 data-[active]:bg-mos-main-100 data-[active]:text-mos-main-500"
      data-active={active}
    >
      {children}
    </div>
  );
};

export default DashboardTabListWrapper;
