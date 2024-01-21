import { useEffect, useState } from "react";
import "./IntroLoader.scss";

interface IProps {
  setLoading: (loading: boolean) => void;
}

const IntroLoader = ({ setLoading }: IProps) => {
  const [currentHello, setCurrentHello] = useState("Hello");
  const [currentHelloIndex, setCurrentHelloIndex] = useState(0);

  useEffect(() => {
    const hello_array = [
      "Hola",
      "Bonjour",
      "Ciao",
      "Konnichiwa",
      "Salaam",
      "Merhaba",
      "Nǐ hǎo",
      "Hallo",
      "Shalom",
    ];
    const interval = setInterval(() => {
      if (currentHelloIndex < hello_array.length) {
        setCurrentHello(hello_array[currentHelloIndex]);
        setCurrentHelloIndex(currentHelloIndex + 1);
      }
      if (currentHelloIndex === hello_array.length) {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [currentHelloIndex, setLoading]);

  return (
    <div className="intro-loader-container">
      <span className="reveal-text-animator">• {currentHello}</span>
    </div>
  );
};

export default IntroLoader;
