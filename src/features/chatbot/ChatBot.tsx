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
        className="fixed bottom-5 right-5 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600"
      >
        💬
      </button>

      {/* Contenedor del chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col border border-gray-300 z-30">
          {/* Encabezado del chat */}
          <div className="bg-gradient-to-r from-[#00A8E8] via-[#25516D] from-2% to-[#25516D] text-white justify-center p-4 font-bold text-center rounded-t-lg flex items-center">
            <img src="img-png/logoats.png" alt="" className="w-14 h-10" />
            <p>Atesegu Chatbot</p>
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
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-gradient-to-r from-[#00A8E8] via-[#25516D] from-2% to-[#25516D] text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
