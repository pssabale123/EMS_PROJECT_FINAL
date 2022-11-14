import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";

function FinalPaper(props) {
  const { selectedPaper, head, handleAddPaperToQuestion, items, text } = props;

  return (
    <div className="">
      <table className="table-auto border-collapse bg-green-200 mt-2 w-full sm:rounded-2xl shadow-xl ">
        <thead>
          <tr className="bg-[#172337] text-white h-10 flex justify-between items-center ">
            {head.map((h) => {
              return (
                <th
                  key={h}
                  className={`text-left ${
                    h == "Question"
                      ? "w-[55%] pl-4"
                      : "w-[26%] pl-2 flex justify-start"
                  } font-thin text-gray-100 `}
                >
                  {h}
                </th>
              );
            })}

            <th
              className={`text-center font-thin  text-gray-100 w-[17%] flex justify-start`}
            >
              Topic
            </th>

            <th className={`text-center font-thin  text-gray-100 w-[8%]`}>
              Marks
            </th>

            <th className="text-center font-thin  text-gray-100 w-[8%]">
              {selectedPaper ? "Select" : ""}
            </th>
          </tr>
        </thead>
        <tbody className="">
          {items.map((item, index) => (
            <tr key={index} className=" flex justify-between items-center ">
              <td className="w-[55%] text-left pl-2 pt-4 font-normal text-gray-600">
                <div className="flex items-start flex-wrap">
                  <span className="m-1">{index + 1 + "]   " + item.text}</span>
                </div>
              </td>

              <td className="w-[30%] px-1 text-center font-normal text-gray-600">
                {item?.correctOption?.optionText}
              </td>
              <td className="w-[30%] px-1 text-center font-normal text-gray-600 ">
                {item.topic?.name}
              </td>
              <td className="w-[10%] px-1 text-center font-normal text-gray-600">
                {item.marks}
              </td>

              <td className="w-[10%] text-gray-500  flex  flex justify-center  ">
                {selectedPaper ? (
                  item.isActive ? (
                    <div className="flex justify-center">
                      <RiCheckboxCircleFill
                        fontSize={28}
                        className="text-green-700"
                        onClick={() =>
                          handleAddPaperToQuestion(item._id, item.isActive)
                        }
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <RiCheckboxBlankCircleLine
                        fontSize={28}
                        color="black"
                        onClick={() =>
                          handleAddPaperToQuestion(item._id, item.isActive)
                        }
                      />
                    </div>
                  )
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FinalPaper;
