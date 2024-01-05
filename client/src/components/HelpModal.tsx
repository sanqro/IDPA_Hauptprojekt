import { IHelpModal } from "../interfaces/props";
import helpData from "../assets/help.json";

const HelpModal = ({ closeModal }: IHelpModal) => {
  const renderHelpContent = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {" "}
        {Object.entries(helpData).map(([title, content]) => (
          <div key={title} className="m-4">
            <h1 className="font-bold mb-2">{title}</h1>{" "}
            {Array.isArray(content) &&
              content.map((subSection: string[], index: number) => (
                <div key={index} className="mb-2">
                  <h5 className="font-semibold">{subSection[0]}</h5>
                  <ul className="list-disc ml-5">
                    {subSection
                      .slice(1)
                      .map((item: string, itemIndex: number) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-60 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto mb-60 border w-[60%] rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="font-bold">Accounting Help</h3>
          <div className="text-left">{renderHelpContent()}</div>
          <div className="items-center px-4 py-3">
            <button
              onClick={closeModal}
              className="w-full py-2 px-4 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
