import { useEffect, useState } from "react";
import "./IntroLoader.scss";

interface IProps {
  setLoading: (loading: boolean) => void;
}

const IntroLoader: React.FC<IProps> = ({ setLoading }) => {
  const [currentHello, setCurrentHello] = useState("Hello");
  const [currentHelloIndex, setCurrentHelloIndex] = useState(0);

  useEffect(() => {
    const helloArray = [
      "Hola",
      "السلام عليكم",
      "Bonjour",
      "こんにちは",
      "Ciao",
      "مرحبًا",
      "Hallo",
      "你好",
      "Olá",
      "Привет",
      "Shalom"
    ];

    const intervalDuration = 150;

    const updateHello = () => {
      if (currentHelloIndex < helloArray.length) {
        setCurrentHello(helloArray[currentHelloIndex]);
        console.log(helloArray[currentHelloIndex]);
        setCurrentHelloIndex((prevIndex) => prevIndex + 1);
      } else {
        setLoading(false);
      }
    };

    const interval = setInterval(updateHello, intervalDuration);

    return () => clearInterval(interval);
  }, [currentHelloIndex, setLoading]);

  return (
    <div className="intro-loader-container">
      <span className="reveal-text-animator"></span>
      <span className="hello">• {currentHello}</span>
    </div>
  );
};

export default IntroLoader;
