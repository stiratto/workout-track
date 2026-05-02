export const Layout = ({
  children,
}: {
  children: preact.ComponentChildren;
}) => {
  return (
    <div
      className={
        "px-2 py-4 flex flex-col items-center w-full font-gallant"
      }
    >
      {children}
    </div>
  );
};
