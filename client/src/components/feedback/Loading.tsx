import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Loading = () => {
  return (
    <div className="fixed inset-0 !z-[100000000000] flex items-center justify-center bg-black/60">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-primary border-opacity-75"></div>
    </div>
  );
};

export const LoadingPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextURL = query.get('next');
  console.log(nextURL || "");

  useEffect(() => {
    if (nextURL) {
      console.log(nextURL || "");
      setTimeout(() => {
        navigate(`/${nextURL}`);
      }, 5000)
    }
  }, [nextURL, navigate])

  return (
    <div className="fixed inset-0 !z-[100000000000] flex items-center justify-center bg-black/60">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-primary border-opacity-75"></div>
    </div>
  );
}

export default Loading;