import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return <div className="w-full max-w-[1140px] mx-auto ">{children}</div>;
};
