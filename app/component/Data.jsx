import React from "react";
import { useState, useRef, useEffect } from "react";

export default function Data({dataAll}) {
    const booked = []
  const [filteredBooked, setFilteredBooked] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل
  const all = useRef();
  const waiting = useRef();
  const accept = useRef();
  const unaccept = useRef();

  useEffect(() => {
    setIsLoading(true); // عرض حالة التحميل
    const filteredData = booked.filter((item) => item); // Filter out falsy values (assuming they shouldn't be displayed)
    setFilteredBooked(filteredData);
    setIsLoading(false);
  },[booked])

  return (
    <div>
      <div className="flex justify-between border-b-2 border-black px-10 mx-3 my-14">
        <p
          // onClick={handleAll}
          ref={all}
          className="cursor-pointer text-blue-600"
        >
          All
        </p>
        <p
          // onClick={() => handleWaiting()}
          ref={waiting}
          className="cursor-pointer text-orange-600"
        >
          waiting
        </p>
        <p
          // onClick={handleAccept}
          ref={accept}
          className="cursor-pointer text-green-600 "
        >
          acceptable
        </p>
        <p
          // onClick={handleUnaccept}
          ref={unaccept}
          className="cursor-pointer text-red-600"
        >
          unacceptable
        </p>
      </div>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          {filteredBooked ? (
            filteredBooked.map((item, ind) => (
              <div
                key={ind}
                className="mb-4 flex gap-5 items-center border-[1px] border-gray-600 rounded-lg p-2 mx-4 hover:bg-gray-200 hover:border-black transition-all hover:shadow-lg cursor-pointer flex-wrap text-white"
              >
                <h2 className="font-bold w-[200px]">{item.titleInfo}</h2>
                <p className="w-[150px]">{item.dateInfo}</p>
                <p className="w-[200px]">{item.typeInfo}</p>
                <div className="flex flex-col justify-center items-center">
                  <p>
                    {item.waite
                      ? "waiting"
                      : item.success
                      ? "acceptable"
                      : item.reject
                      ? "unacceptable"
                      : "null"}
                  </p>
                  <div
                    className={`w-[30px] h-[30px] rounded-full ${
                      item.waite
                        ? "bg-orange-600"
                        : item.success
                        ? "bg-green-600"
                        : item.reject
                        ? "bg-red-600"
                        : "bg-white"
                    }`}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p>not found</p>
          )}
        </div>
      )}
    </div>
  );
}
