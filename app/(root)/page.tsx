import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { dummyInterviews } from "@/constants";

import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

const Home = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterview = userInterviews && userInterviews?.length > 0;

  const hasUpcomingInterviews =
    latestInterviews && latestInterviews?.length > 0;

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
          {!hasPastInterview && <p>You Haven't Taken Any Interviews Yet</p>}

          {userInterviews?.map((interview, i) => (
            <InterviewCard key={i} {...interview} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take An Interview</h2>

        <div className="interviews-section">
          {!hasUpcomingInterviews && <p>There Are No Interviews Availabel</p>}

          {latestInterviews?.map((interview, i) => (
            <InterviewCard key={i} {...interview} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
