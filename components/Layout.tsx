import { ChildrenType } from "@/types";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: ChildrenType;
};
export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <main className="flex-1 flex justify-center m-4">{children}</main>
      <Footer></Footer>
    </div>
  );
}
