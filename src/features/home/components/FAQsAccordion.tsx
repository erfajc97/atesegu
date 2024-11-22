import { useState } from "react";
import { faqs } from "../faqs";

const FAQsAccordion = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id); // Alterna entre abrir/cerrar
  };

  return (
    <section className=" mt-5 lg:mt-10 lg:w-[70%] px-5 mx-auto">
      <h2 className="text-center text-[#303A42] lg:text-4xl text-3xl font-bold">
        FAQs (Preguntas frecuentes)
      </h2>
      <div className="lg:mt-10 mt-5 grid grid-cols-1 lg:gap-4  lg:px-5 px-2 ">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={` rounded-lg transition-all duration-300 p-2 ${
              openId === faq.id ? " bg-gray-100 shadow-lg" : "bg-transparent"
            }`}
          >
            <div
              className="collapse-title lg:text-xl text-[14px] font-medium cursor-pointer lg:p-4 p-2 flex justify-between"
              onClick={() => toggleAccordion(faq.id)}
            >
              <p className={`${openId === faq.id ? "text-blue-500" : ""}`}>
                {faq.question}
              </p>
              <p className={`${openId === faq.id ? "text-blue-500" : ""}`}>
                {openId === faq.id ? "+" : "-"}
              </p>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 text-[12px] lg:text-[16px] ${
                openId === faq.id ? "max-h-96 p-4" : "max-h-0"
              }`}
              style={{
                maxHeight: openId === faq.id ? "300px" : "0",
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQsAccordion;
