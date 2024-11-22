import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  type: "user" | "bot" | "error";
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado para controlar el chat
  const [messages, setMessages] = useState<Message[]>([]); // Mensajes enviados y recibidos
  const [userInput, setUserInput] = useState<string>(""); // Entrada del usuario
  const [socket, setSocket] = useState<Socket | null>(null); // Instancia del socket

  useEffect(() => {
    // Conectar al servidor de Socket.IO
    const newSocket = io("https://atsbot.shepwashi.com/");
    setSocket(newSocket);

    // Manejar las respuestas del servidor
    newSocket.on("response", (data: { error?: string; response?: string }) => {
      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { type: "error", text: data.error || "Unknown error" },
        ]);
      } else if (data.response) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: data.response || "" },
        ]);
      }
    });

    // Desconectar el socket al desmontar el componente
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (userInput.trim() && socket) {
      // Agregar el mensaje del usuario
      setMessages((prev) => [...prev, { type: "user", text: userInput }]);

      // Enviar mensaje al servidor
      socket.emit("message", { user_input: userInput });

      // Limpiar la entrada
      setUserInput("");
    }
  };

  return (
    <div>
      {/* Botón flotante para abrir/cerrar el chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-[#2475b8] lg:p-5 p-3 text-white w-20 h-20 lg:w-28 lg:h-28 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 z-50"
      >
        <svg
          id="Capa_1"
          enable-background="new 0 0 512 512"
          height="412"
          viewBox="0 0 512 512"
          width="412"
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <g id="Page-1_9_">
              <g id="_x30_10---Chat-Bot-Head">
                <path
                  id="Shape_72_"
                  d="m477.867 230.395h-8.533v-34.133c-.038-32.974-26.759-59.696-59.733-59.733h-145.068v-52.054c21.461-4.381 36.119-24.3 33.917-46.093-2.201-21.793-20.546-38.378-42.45-38.378s-40.249 16.586-42.451 38.378c-2.202 21.793 12.456 41.712 33.917 46.093v52.053h-145.066c-32.974.038-59.696 26.759-59.733 59.733v34.133h-8.533c-18.852.001-34.134 15.283-34.134 34.134v51.2c0 18.851 15.282 34.133 34.133 34.133h8.533v34.133c.038 32.974 26.759 59.696 59.733 59.733v59.733c0 3.148 1.732 6.04 4.508 7.525s6.143 1.321 8.762-.426l98.133-65.408c1.391-.924 3.023-1.42 4.693-1.425h191.105c32.974-.038 59.696-26.759 59.733-59.733v-34.133h8.533c18.851 0 34.133-15.282 34.133-34.133v-51.2c.001-18.85-15.281-34.132-34.132-34.132zm-247.467-187.733c0-14.138 11.462-25.6 25.6-25.6 14.139 0 25.6 11.462 25.6 25.6s-11.461 25.6-25.6 25.6c-14.138 0-25.6-11.462-25.6-25.6zm-196.267 290.133c-9.426 0-17.067-7.641-17.067-17.067v-51.2c0-9.426 7.641-17.067 17.067-17.067h8.533v85.333h-8.533zm418.134 51.2c-.028 23.552-19.114 42.638-42.667 42.667h-191.104c-5.052-.018-9.994 1.467-14.199 4.267l-84.83 56.585v-43.785c0-9.426-7.641-17.067-17.067-17.067-23.552-.028-42.638-19.114-42.667-42.667v-187.733c.028-23.552 19.114-42.638 42.667-42.667h307.2c23.552.028 42.638 19.114 42.667 42.667zm42.666-68.267c0 9.426-7.641 17.067-17.067 17.067h-8.533v-85.333h8.533c9.426 0 17.067 7.641 17.067 17.067z"
                ></path>
                <path
                  id="Shape_71_"
                  d="m153.6 221.862c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667 42.667-19.103 42.667-42.667c-.029-23.553-19.115-42.639-42.667-42.667zm0 68.266c-14.138 0-25.6-11.462-25.6-25.6s11.462-25.6 25.6-25.6 25.6 11.462 25.6 25.6-11.462 25.6-25.6 25.6z"
                ></path>
                <path
                  id="Shape_70_"
                  d="m358.4 221.862c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667 42.667-19.103 42.667-42.667c-.029-23.553-19.115-42.639-42.667-42.667zm0 68.266c-14.138 0-25.6-11.462-25.6-25.6s11.462-25.6 25.6-25.6 25.6 11.462 25.6 25.6-11.462 25.6-25.6 25.6z"
                ></path>
                <path
                  id="Shape_69_"
                  d="m303.275 325.704c-3.938-2.509-9.158-1.423-11.767 2.449-.358.538-9.216 13.175-35.507 13.175-26.061 0-34.987-12.425-35.499-13.158-2.567-3.876-7.765-4.984-11.689-2.491-3.925 2.492-5.132 7.668-2.715 11.639.538.853 13.594 21.077 49.903 21.077s49.365-20.215 49.903-21.077c2.449-3.939 1.278-9.115-2.629-11.614z"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </button>

      {/* Contenedor del chat */}
      {isOpen && (
        <div className="fixed bottom-28 lg:bottom-36 right-5 w-11/12 lg:w-[600px] lg:h-[700px]  h-[600px] bg-white shadow-lg rounded-lg flex flex-col border border-gray-300 z-30">
          {/* Encabezado del chat */}
          <div className="bg-gradient-to-r from-[#00A8E8] via-[#25516D] from-2% to-[#25516D] text-white justify-center p-4 font-bold text-center rounded-t-lg flex items-center">
            <img src="img-png/logowhite2.png" alt="" className="w-20 h-16" />
            <p className="lg:text-[26px] text-base">Atesegu Chatbot</p>
          </div>

          {/* Mensajes del chat */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                {message.type === "user" && (
                  <p className="text-right text-blue-600 font-semibold">
                    You:
                    <span className="text-black"> {message.text}</span>
                  </p>
                )}
                {message.type === "bot" && (
                  <p className="text-left text-blue-600">
                    AtsBot:
                    <span className="text-black"> {message.text}</span>
                  </p>
                )}
                {message.type === "error" && (
                  <p className="text-red-500">Error: {message.text}</p>
                )}
              </div>
            ))}
          </div>

          {/* Área de entrada */}
          <div className="p-4 bg-gray-100 flex border-t border-gray-300">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 lg:text-[26px] text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-gradient-to-r from-[#00A8E8] via-[#25516D] from-2% to-[#25516D] text-white lg:px-10 px-5 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 lg:text-[26px]"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
