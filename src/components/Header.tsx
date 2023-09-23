/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export function Header({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <div className="flex flex-col gap-y-1">{children}</div>;
}

Header.Logo = function Logo() {
  return (
    <div className="flex justify-center border-b-2 border-black">
      <img
        src="/logo.svg"
        style={{
          objectFit: "cover",
          height: "100%",
          width: "50%",
          display: "block",
          maxWidth: "100%",
        }}
      />
    </div>
  );
};

Header.Date = function Date({
  date,
  location,
}: {
  date: Date;
  location: string;
}) {
  return (
    <div className="uppercase flex justify-between items-center border-y border-black py-1 font-solina">
      <span>
        {date.toLocaleDateString("no-NB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        })}
      </span>
      <span>{location}</span>
      <span>
        {date.toLocaleDateString("no-NB", {
          year: "numeric",
        })}
      </span>
    </div>
  );
};
