import Head from "next/head";
import { useUser, useOrganization } from "@clerk/nextjs";
import Header from "../compenents/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../compenents/ui/card";

const Home = () => {
  const user = useUser();

  const { membershipList } = useOrganization({
    membershipList: {},
  });

  if (typeof membershipList !== "object" || membershipList === null) {
    return null;
  }

  const membershipArray = Object.values(membershipList);
  const memberNames = membershipArray.map((m) => m.publicUserData.userId);

  console.log(memberNames);

  return (
    <>
      <Head>
        <title>aaa</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <div className="flex gap-3">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                className="rounded-lg"
                src="https://source.unsplash.com/random/400x200"
                alt=""
              />
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Home;
