import { Fragment } from "react";
import StartingPageContent from "../components/starting-page";
import MainNavigation from "@/components/main-navigation";

export default function Home() {
   return (
      <Fragment>
         <MainNavigation />
         <StartingPageContent />
      </Fragment>
   );
}
