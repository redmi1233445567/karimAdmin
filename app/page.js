"use client";
import React, { useState, useEffect, useRef } from "react";
import supabase from "./config/supabaseClient";

export default function Home() {
  const [booked, setBooked] = useState([]);
  const [filteredBooked, setFilteredBooked] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل
  const all = useRef();
  const waiting = useRef();
  const accept = useRef();
  const unaccept = useRef();


  useEffect(() => {
    setIsLoading(true); // عرض حالة التحميل
    const fetchBooked = async () => {
      const { data } = await supabase.from("Requests").select();

      if (data) {
        setBooked(data);
      }
    };

    fetchBooked();
    const filteredData = booked.filter((item) => item); // Filter out falsy values (assuming they shouldn't be displayed)
    setFilteredBooked(filteredData);
    setIsLoading(false);
  }, []);

  const handleAll = () => {
    setFilteredBooked(booked);
    all.current.classList.add("active");
    waiting.current.classList.remove("active");
    accept.current.classList.remove("active");
    unaccept.current.classList.remove("active");
    console.log(booked)
  };

  const handleWaiting = () => {
    const waitingItems = booked.filter((item) => item.waite);
    setFilteredBooked(waitingItems);
    console.log(filteredBooked);
    waiting.current.classList.add("active");
    all.current.classList.remove("active");
    accept.current.classList.remove("active");
    unaccept.current.classList.remove("active");
  };

  const handleAccept = () => {
    const acceptItems = booked.filter((item) => item.success);
    setFilteredBooked(acceptItems);
    waiting.current.classList.remove("active");
    all.current.classList.remove("active");
    accept.current.classList.add("active");
    unaccept.current.classList.remove("active");
  };

  const handleUnaccept = () => {
    const rejectItems = booked.filter((item) => item.reject);
    setFilteredBooked(rejectItems);
    waiting.current.classList.remove("active");
    all.current.classList.remove("active");
    accept.current.classList.remove("active");
    unaccept.current.classList.add("active");
  };
  

  const handelConsent = async (e) => {
    let titleInfo ;
    let dateInfo;
    let typeInfo;
    let waite ;
    let success ;
    let reject ;
    for (let i = 0; i < booked.length; i++) {
      if (booked[i].id == e) {
        titleInfo = booked[i].titleInfo;
        dateInfo = booked[i].dateInfo;
        typeInfo = booked[i].typeInfo;
        waite = false;
        success = true;
        reject = false;
        i= 30;
      }
    }

    const { data2 } = await supabase
      .from("Requests")
      .update({ titleInfo, dateInfo, typeInfo, waite, success, reject })
      .eq("id", e)
      .select();

      location.reload()

  };

  const handelrejectAdmin = async (e) => {
    let titleInfo ;
    let dateInfo;
    let typeInfo;
    let waite ;
    let success ;
    let reject ;
    for (let i = 0; i < booked.length; i++) {
      if (booked[i].id == e) {
        titleInfo = booked[i].titleInfo;
        dateInfo = booked[i].dateInfo;
        typeInfo = booked[i].typeInfo;
        waite = false;
        success = false;
        reject = true;
        i= 30;
      }
    }

    const { data2 } = await supabase
      .from("Requests")
      .update({ titleInfo, dateInfo, typeInfo, waite, success, reject })
      .eq("id", e)
      .select();

      location.reload()
  };

  return (
    <div>
      <h1 className="text-center text-3xl text-green-600 font-bold my-6">Perfect Scape</h1>
      <div className="w-full h-[200px] bg-black text-white font-bold flex justify-center items-center text-3xl">
        <h1>Order management</h1>
      </div>
      <div className="flex justify-between border-b-2 border-black px-10 mx-3 my-14">
        <p
          onClick={handleAll}
          ref={all}
          className="cursor-pointer text-blue-600"
        >
          All
        </p>
        <p
          onClick={() => handleWaiting()}
          ref={waiting}
          className="cursor-pointer text-orange-600"
        >
          waiting
        </p>
        <p
          onClick={handleAccept}
          ref={accept}
          className="cursor-pointer text-green-600 "
        >
          acceptable
        </p>
        <p
          onClick={handleUnaccept}
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
          {filteredBooked.length ? (
            filteredBooked.map((item, ind) => (
              <div
                key={ind}
                className="mb-4 flex gap-5 items-center border-[1px] border-gray-600 rounded-lg p-2 mx-4 hover:bg-gray-950 hover:border-black transition-all hover:shadow-lg cursor-pointer flex-wrap text-white"
              >
                <h2 className="font-bold w-[200px]">{item.titleInfo}</h2>
                <p className="w-[150px]">{item.dateInfo}</p>
                <p className="w-[200px]">{item.typeInfo}</p>
                <div className="flex flex-col justify-center items-center">
                  <div>
                    {item.waite ? (
                      <div className="flex gap-3">
                        <div onClick={() => {handelConsent(item.id); handleAll()}} className="p-2 cursor-pointer bg-white rounded-md hover:bg-gray-600 transition-all">
                          ✔️
                        </div>
                        <div onClick={() => {handelrejectAdmin(item.id); handleAll()}} className="p-2 cursor-pointer bg-white rounded-md hover:bg-gray-600 transition-all">
                          ❌
                        </div>
                      </div>
                    ) : item.success ? (
                      "acceptable"
                    ) : item.reject ? (
                      "unacceptable"
                    ) : (
                      "null"
                    )}
                  </div>
                  <div
                    className={`w-[30px] h-[30px] rounded-full ${
                      item.waite
                        ? console.log("test")
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
            <p className="text-center">Select section</p>
          )}
        </div>
      )}
    </div>
  );
}
