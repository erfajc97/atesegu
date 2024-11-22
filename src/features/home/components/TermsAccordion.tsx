import { useState } from "react";
import { terms } from "./terms";

const TermsAccordion = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className=" mt-5 lg:mt-10 lg:w-[70%] px-5 mx-auto">
      <h2 className="text-center text-[#303A42] lg:text-4xl text-3xl font-bold">
        Glosario (Terminos frecuentes)
      </h2>
      <div className="lg:mt-10 mt-5 grid grid-cols-1lg:gap-4  lg:px-5 px-2 ">
        {terms.map((term) => (
          <div
            key={term.id}
            className={` rounded-lg transition-all duration-300 p-2 ${
              openId === term.id ? " bg-gray-100 shadow-lg" : "bg-transparent"
            }`}
          >
            <div
              className="collapse-title lg:text-xl text-[14px] font-medium cursor-pointer lg:p-4 p-2 flex justify-between"
              onClick={() => toggleAccordion(term.id)}
            >
              <p className={`${openId === term.id ? "text-blue-500" : ""}`}>
                {term.question}
              </p>
              <p className={`${openId === term.id ? "text-blue-500" : ""}`}>
                {openId === term.id ? "+" : "-"}
              </p>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 text-[12px] lg:text-[16px] ${
                openId === term.id ? "max-h-96 p-4" : "max-h-0"
              }`}
              style={{
                maxHeight: openId === term.id ? "300px" : "0",
              }}
            >
              <p>{term.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TermsAccordion;
