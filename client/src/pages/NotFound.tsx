import NavigationButton from "../components/NavigationButton";

function NotFound() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center rounded-md py-8 px-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          404:This page was not found
        </h1>
        <NavigationButton destination="/">Go Home</NavigationButton>
      </div>
    </div>
  );
}

export default NotFound;
