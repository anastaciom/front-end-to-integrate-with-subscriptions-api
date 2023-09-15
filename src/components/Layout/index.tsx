import { Header } from "./Header";

interface LayoutPageProps {
  children: JSX.Element;
}

export const LayoutPage = ({ children }: LayoutPageProps) => {
  return (
    <main className="h-screen w-screen flex-col">
      <Header />
      {children}
    </main>
  );
};
