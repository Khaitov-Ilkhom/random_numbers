import {useState} from "react";
import {useGetTriviaQuery} from "../../redux/api/getAllApi.js";
import {Select} from "antd";
import AnimatedNumbers from "react-animated-numbers";
import {ChevronUp, ChevronDown} from 'lucide-react';

const RandomNumbers = () => {
  const [category, setCategory] = useState("/trivia");
  const [numbers, setNumbers] = useState(Math.floor(Math.random() * 9999));
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(numbers);

  const {data, isLoading} = useGetTriviaQuery({numbers, category});

  const randomNum = () => {
    const random = Math.floor(Math.random() * 9999);
    setNumbers(random);
    setInputValue(random);
  };

  const onChange = (value) => {
    setCategory(value);
  };

  const handleInputBlur = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      setNumbers(num);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue(numbers); // revert
    }
  };

  return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="relative w-full min-h-screen">
          <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)]"/>
          <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"/>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"/>

          <div className="relative max-w-6xl mx-auto py-[100px]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 p-8">
              <div className="w-full md:w-64 flex flex-col items-center gap-8">
                <div className="w-full max-w-[200px]">
                  <Select
                      className="w-full"
                      optionFilterProp="label"
                      onChange={onChange}
                      defaultValue="/trivia"
                      options={[
                        {value: "/trivia", label: "Trivia"},
                        {value: "/year", label: "Year"},
                        {value: "/date", label: "Date"},
                        {value: "/math", label: "Math"},
                      ]}
                  />
                </div>

                <div className="w-full bg-gray-800/50 rounded-xl border border-yellow-500/30 overflow-hidden
                            shadow-[0_0_20px_rgba(255,215,0,0.1)] backdrop-blur-sm
                            hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] transition-all duration-300">
                  <button
                      onClick={() => {
                        setNumbers(numbers + 1);
                        setInputValue(numbers + 1);
                      }}
                      className="w-full p-3 text-yellow-400 hover:text-yellow-300 hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <ChevronUp className="h-8 w-8 mx-auto"/>
                  </button>

                  <div
                      className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 border-y border-yellow-600">
                    <div
                        className="w-full flex justify-center items-center text-4xl font-mono text-gray-900 font-bold text-center py-4 tracking-wider">
                      {isEditing ? (
                          <input
                              type="number"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onBlur={handleInputBlur}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="text-center text-4xl font-mono bg-transparent outline-none w-full"
                          />
                      ) : (
                          <div
                              onClick={() => setIsEditing(true)}
                              className="cursor-pointer"
                          >
                            <AnimatedNumbers
                                includeComma
                                transitions={(index) => ({
                                  duration: index + 0.3,
                                })}
                                animateToNumber={numbers}
                            />
                          </div>
                      )}
                    </div>
                  </div>

                  <button
                      onClick={() => {
                        if (numbers > 0) {
                          setNumbers(numbers - 1);
                          setInputValue(numbers - 1);
                        }
                      }}
                      className="w-full p-3 text-yellow-400 hover:text-yellow-300 hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <ChevronDown className="h-8 w-8 mx-auto"/>
                  </button>
                </div>

                <button
                    onClick={randomNum}
                    className="w-full text-xl bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-gray-900
                         font-bold py-4 px-6 rounded-xl transform transition-all duration-300
                         hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]
                         border border-yellow-400/50"
                >
                  Generate Number
                </button>
              </div>

              <div className="w-full md:w-1/2 min-h-[200px] bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm
                          border border-yellow-500/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]
                          flex items-center justify-center">
                <div className={`text-4xl font-light break-words text-center ${isLoading ? 'animate-pulse' : ''}`}>
                  <span
                      className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-transparent bg-clip-text">
                    {isLoading ? "Loading..." : String(data).replace(/(\d+)/g, " $1 -")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RandomNumbers;

