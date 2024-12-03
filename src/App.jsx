import React, { useState, useEffect } from "react";


import earth from "../public/earth.svg";
import facebook from "../public/facebook.svg";
import github from "../public/github.svg";
import instagram from "../public/instagram.svg";
import telegram from "../public/telegram.svg";
import CircleImg from "../public/circle.png";
import header_img from "./header-left-img.svg";

function App() {
  const [url, setUrl] = useState(null);
  const [fData, setFData] = useState(null);
  const [users, setUsers] = useState([]);
  function validateForm(data) {
    const errors = [];

    if (data.companyName.trim().length < 3) {
      errors.push(
        "Kompaniya nomi kamida 3 ta belgidan iborat bo'lishi kerak!!!"
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Email noto'g'ri kiritilgan!!!");
    }

    const phoneRegex = /^\+998[0-9]{9}$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      errors.push(
        "Telefon raqami noto'g'ri kiritilgan. Telefon raqamini boshi +998 dan boshlanishi kerak!!!"
      );
    }

    if (data.country.trim() === "") {
      errors.push("Yashash joyi kiritilmagan!!!");
    }

    if (data.employeCount <= 0) {
      errors.push("Hodimlar soni musbat bo'lishi kerak!!!");
    }

    if (data.note.trim().length < 10) {
      errors.push("Izoh kamida 10 ta belgidan iborat bo'lishi kerak!!!");
    }

    if (data.nationaly === "Davlat" || !data.nationaly) {
      errors.push("Davlatni tanlang!!!");
    }

    if (data.city === "Shahar" || !data.city) {
      errors.push("Shaharni tanlang!!!");
    }

    return errors;
  }
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const deleteUser = (index) => {
    const isConfirm = window.confirm("Rostan ham bu cardni ochirasmi ???");

    if (isConfirm) {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  return (
    <>
      <div className="mb-5">
        <header className="mb-[60px] text-white bg-[#5361E4] w-full flex py-[17px] px-[150px] justify-between items-center">
          <div>
            <img src={header_img} alt="" />
          </div>
          <div>
            <ul className="flex gap-[48px]">
              <li>
                <a target="_blank" href="https://Vacancie.com">
                  Vakansiyalar
                </a>
              </li>
              <li>
                <a target="_blank" href="https://Candidate.com">
                  Kandidatlar
                </a>
              </li>
              <li>
                <a target="_blank" href="https://Companies.com">
                  Kompaniyalar
                </a>
              </li>
              <li>
                <a target="_blank" href="https://Services.com">
                  Xizmatlar
                </a>
              </li>
              <li>
                <a target="_blank" href="https://Education.com">
                  Talim
                </a>
              </li>
            </ul>
          </div>
          <div className="flex gap-[38px]">
            <select className="bg-[#5361E4]">
              <option value="uzbek">uzbek</option>
              <option value="russian">russian</option>
              <option value="english">english</option>
            </select>
            <button className="btn text-[#5361E4]">Boshlash</button>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-md p-[23px] w-[60%] m-0 mx-auto">
          <div className="mb-5">
            <h1 className="font-bold mb-5 text-2xl">Kompaniya malumotlari</h1>
            <p>Kompaniya haqidagi malumotlarni kiriting</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const result = {};
              formData.entries().forEach(([key, value]) => {
                result[key] = value;
              });

              const errors = validateForm(result);
              if (errors.length > 0) {
                alert(errors.join("\n"));
                return;
              }

              setFData((prev) => {
                return { ...prev, ...result };
              });
              result.url = fData.url;
              setUsers((prev) => [...prev, { ...prev, ...result }]);
              e.target.reset();
              setUrl(null);
            }}
            className="flex flex-col w-full gap-5"
          >
            <div className="flex items-center gap-5">
              <img
                className="w-[84px] h-[84px] rounded-full"
                src={url || CircleImg}
              />
              <label className="text-[#5361E4] font-medium text-xl hover:underline cursor-pointer">
                Yuklash
                <input
                  onChange={(e) => {
                    const img = e.target.files[0];
                    const url = URL.createObjectURL(img);
                    setUrl(url);
                    setFData((prev) => {
                      return { ...prev, url };
                    });
                  }}
                  className="hidden"
                  type="file"
                />
              </label>
            </div>
            {/* Kompaniya haqida */}
            <label className="form-control w-full cursor-pointer">
              <div className="label">
                <span className="label-text flex gap-1">
                  Kompaniya nomi <h6 className="text-[#FF2424]">*</h6>
                </span>
              </div>
              <input
                required
                name="companyName"
                type="text"
                placeholder="Kompaniya nomi"
                className="input input-bordered w-full"
              />
            </label>
            {/* Email malumoti */}

            <label className="form-control w-full cursor-pointer">
              <div className="label">
                <span className="label-text flex gap-1">
                  Email <h6 className="text-[#FF2424]">*</h6>
                </span>
              </div>
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
            </label>


            <label className="form-control w-full cursor-pointer">
              <div className="label">
                <span className="label-text flex gap-1">
                  Telefon raqami <h6 className="text-[#FF2424]">*</h6>
                </span>
              </div>
              <input
                required
                name="phoneNumber"
                type="tel"
                placeholder="UZ +9989"
                className="input input-bordered w-full"
              />
            </label>
            {/* Barcha linklari */}
            <label className="form-control w-full mb-5 cursor-pointer">
              <div className="label">
                <span className="label-text flex gap-1">
                  Linklar <h6 className="text-[#FF2424]">*</h6>
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    const modal = document.getElementById("myEarth");
                    modal.showModal();
                  }}
                >
                  <img src={earth} alt="" />
                </button>
                <button
                  onClick={() => {
                    const modal = document.getElementById("myInstagram");
                    modal.showModal();
                  }}
                >
                  <img src={instagram} alt="" />
                </button>
                <button
                  onClick={() => {
                    const modal = document.getElementById("myTelegram");
                    modal.showModal();
                  }}
                >
                  <img src={telegram} alt="" />
                </button>
                <button
                  onClick={() => {
                    const modal = document.getElementById("myFacebook");
                    modal.showModal();
                  }}
                >
                  <img src={facebook} alt="" />
                </button>
                <button
                  onClick={() => {
                    const modal = document.getElementById("myGithub");
                    modal.showModal();
                  }}
                >
                  <img src={github} alt="" />
                </button>
              </div>
            </label>
            {/* Davlat va Shahar haqida */}

            <div className="flex gap-5 mb-5 cursor-pointer">
              <label className="form-control w-full cursor-pointer">
                <div className="label">
                  <span className="label-text flex gap-1">
                    Davlat <h6 className="text-[#FF2424]">*</h6>
                  </span>
                </div>
                <select
                  name="nationaly"
                  className="border w-[341px] h-[50px] rounded-2xl px-4 py-2"
                >
                  <option value="Davlat">Davlat</option>
                  <option value="uzbek">uzbek</option>
                  <option value="english">english</option>
                  <option value="russian">russian</option>
                </select>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text flex gap-1 cursor-pointer">
                    Sheahar <h6 className="text-[#FF2424]">*</h6>
                  </span>
                </div>
                <select
                  name="city"
                  className="border w-[341px] h-[50px] rounded-2xl px-4 py-2"
                >
                  <option value="Davlat">Shahar</option>
                  <option value="Toshkent">Toshkent</option>
                  <option value="Fergana">Fergana</option>
                  <option value="New-York">New-York</option>
                </select>
              </label>
            </div>
            {/* Joy haqida */}

            <label className="form-control w-full cursor-pointer">
              <div className="label">
                <span className="label-text flex gap-1">
                  Yashash joyi <h6 className="text-[#FF2424]">*</h6>
                </span>
              </div>
              <input
                required
                name="country"
                type="text"
                placeholder="Joy"
                className="input input-bordered w-full"
              />
            </label>
            {/* Hodimlar soni haqida */}

            <label className="form-control w-full cursor-pointer">
              <div className="label">
                <span className="label-text flex gap-1">
                  Hodimlar soni <h6 className="text-[#FF2424]">*</h6>
                </span>
              </div>
              <input
                required
                name="employeCount"
                type="number"
                placeholder="Hodimlar soni"
                className="input input-bordered w-full"
              />
            </label>
            {/* Izoh bolimi */}
            <label className="form-control w-full cursor-pointer">
              <div className="label">
                <span className="label-text flex gap-1">
                  Izoh <h6 className="text-[#FF2424]">*</h6>
                </span>
              </div>
              <textarea
                required
                name="note"
                placeholder="Kompaniya haqida izoh qoldiring"
                className="input input-bordered w-full h-[148px] pt-4 pl-4 mb-10"
                rows="4"
              ></textarea>
            </label>

            {/* Register tugmasi bu tomonda */}

            <div className="register-div flex justify-between">
              <button className="btn text-base text-[#6E6D77] rounded-2xl w-[180px]">
                Ortga
              </button>
              <button
                type="submit"
                className="btn bg-[#5361E4] text-white text-right flex w-[174px] hover:bg-blue-500 rounded-2xl"
              >
                Keyingi
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Card yasash sikl bolimi */}
      <div className="flex flex-wrap gap-5 justify-between container mx-auto px-10">
        {users.length > 0 &&
          users.map(
            (
              {
                companyName,
                email,
                url,
                phoneNumber,
                country,
                employeCount,
                city,
                note,
                nationaly,
              },
              index
            ) => {
              return (
                <div
                  key={index}
                  className="w-[1000px] mx-auto border p-5 rounded-2xl bg-lime-500 flex gap-5 items-center flex-col mb-5"
                >
                  <div className="w-[1000px] mx-auto flex gap-10 items-center relative">
                    <button
                      onClick={() => deleteUser(index)}
                      className="absolute top-[-10px] right-7 bottom-10 btn btn-error"
                    >
                      del
                    </button>
                    <div className="">
                      <img className="w-[100px]" src={url} alt="" />
                    </div>
                    <div className="flex flex-col gap-5">
                      <h2 className="text-lg font-mono font-black">
                        Kompaniya nomi: {companyName}
                      </h2>
                      <i className="font-bold">Email: {email}</i>
                      <i className="font-bold">UZ +9989 {phoneNumber}</i>
                    </div>

                    <div className="">
                      <h2>Linklar: </h2>
                      <div className="flex flex-col gap-1">
                        <a href="https://github.com/avazbek489" target="_blank">
                          https://github.com/avazbek489/
                        </a>
                        <a href="https://github.com/avazbek489" target="_blank">
                          https://github.com/avazbek489/
                        </a>
                        <a href="https://github.com/avazbek489" target="_blank">
                          https://github.com/avazbek489/
                        </a>
                        <a href="https://github.com/avazbek489" target="_blank">
                          https://github.com/avazbek489/
                        </a>
                        <a href="https://github.com/avazbek489" target="_blank">
                          https://github.com/avazbek489/
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-3 flex-col">
                        <h4>Davlat: {nationaly}</h4>
                        <h4>Shahar: {city}</h4>
                      </div>
                      <div className="flex gap-3 flex-col">
                        <h5>Yashash joyi: {country}</h5>
                        <h5>Hodimlar soni: {employeCount}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="w-[500px]">
                    <p className="w-[500px] flex flex-col overflow-y-scroll h-[70px]">
                      <span className="text-red-600 font-bold text-lg">
                        Izoh:
                      </span>{" "}
                      {note}
                    </p>
                  </div>
                </div>
              );
            }
          )}
      </div>

      {/* Modal oyna ochilishi */}
      {/* earth */}
      <dialog id="myEarth" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-5">Enter earth your link</h3>
          <form className="flex justify-between items-center">
            <input
              name="earth"
              className="input input-bordered w-full max-w-xs"
              required
              type="url"
              placeholder="Enter earth your link"
            />
            <button className="btn">Submit</button>
          </form>
        </div>
      </dialog>
      {/* instagram */}
      <dialog id="myInstagram" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-5">Enter instagram your link</h3>
          <form className="flex justify-between items-center">
            <input
              name="instagram"
              className="input input-bordered w-full max-w-xs"
              required
              type="url"
              placeholder="Enter instagram your link"
            />
            <button className="btn">Submit</button>
          </form>
        </div>
      </dialog>
      {/* telegram */}
      <dialog id="myTelegram" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-5">Enter telegram your link</h3>
          <form className="flex justify-between items-center">
            <input
              name="telegram"
              className="input input-bordered w-full max-w-xs"
              required
              type="url"
              placeholder="Enter telegram your link"
            />
            <button className="btn">Submit</button>
          </form>
        </div>
      </dialog>
      {/* facebook */}
      <dialog id="myFacebook" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-5">Enter facebook your link</h3>
          <form className="flex justify-between items-center">
            <input
              name="facebook"
              className="input input-bordered w-full max-w-xs"
              required
              type="url"
              placeholder="Enter facebook your link"
            />
            <button className="btn">Submit</button>
          </form>
        </div>
      </dialog>
      {/* github */}
      <dialog id="myGithub" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-5">Enter github your link</h3>
          <form className="flex justify-between items-center">
            <input
              name="github"
              className="input input-bordered w-full max-w-xs"
              required
              type="url"
              placeholder="Enter github your link"
            />
            <button className="btn">Submit</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
export default App;
