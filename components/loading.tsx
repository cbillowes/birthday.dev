import { Spinner } from "@/components/spinner";

export const Loading = () => {
  return (
    <div className="max-w-2xl h-screen mx-auto mt-8 justify-center items-center flex">
      <Spinner />
    </div>
  );
};
