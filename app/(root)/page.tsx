import Link from "next/link";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";

const Home = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview Ready With AI Powered Practice & Feedback</h2>

          <p className="text-lg">
            Practice On Real Interview Questions & Instant Feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href={"/interview"}>Start An Interview</Link>
          </Button>
        </div>

        <Image
          src={"/robot.png"}
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {!dummyInterviews && <p>You Haven&apos;t Taken Any Interviews Yet</p>}

          {dummyInterviews &&
            dummyInterviews?.map((interview, i) => (
              <InterviewCard key={i} {...interview} />
            ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take An Interview</h2>

        <div className="interviews-section">
          {!dummyInterviews && <p>There Are No Interviews Availabel</p>}

          {dummyInterviews &&
            dummyInterviews?.map((interview, i) => (
              <InterviewCard key={i} {...interview} />
            ))}
        </div>
      </section>
    </>
  );
};

export default Home;
