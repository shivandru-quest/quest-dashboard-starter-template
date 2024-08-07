import { useContext, useState, useEffect } from "react";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "./AppContext";
import axios from "axios";
export default function LoginWrapper({ children }) {
  const { appConfig, theme, bgColors, contentConfig } =
    useContext(ThemeContext);
  const [quote, setQuote] = useState("");
  useEffect(() => {
    getQuote();
  }, []);
  async function getQuote() {
    try {
      let res = await axios.get(`/api/qotd`);
      setQuote(res.data.quote.body);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex h-screen w-full">
      <div className="hidden md:flex flex-col text-center md:w-1/2  w-1/2 justify-center items-center">
        <div
          className="w-[38rem] h-[50rem] flex flex-col justify-between items-start rounded-[1.5rem] border-r-[1px] py-[4rem] px-[2.88rem]"
          style={{
            borderRightColor: "#A558FF",
            background:
              "linear-gradient(30deg, #1F3EFE 30.23%, #A904DD 33.75%, #F5636E 102.49%)",
          }}
        >
          <div className="flex justify-end items-center w-full">
            <p className="text-[#ffffff] font-[400] text-[1.125rem] leading-7 tracking-[-0.01125rem]">
              {quote}
            </p>
          </div>
          <div></div>
          <div className="w-full h-[11.2rem] flex flex-col gap-[0.5rem]">
            <div>
              <p className="text-[2rem] font-[600] text-[#ffffff] leading-[3.75rem] tracking-[-0.04rem]">
                Quest
              </p>
              <p className="font-[600] text-[4rem] leading-[3.75rem] tracking-[-0.08rem] text-[#ffffff] font-[figtree]">
                Hive
              </p>
            </div>
            <div>
              <p className="text-[1.125rem] leading-[1.75rem] tracking-[0.01125rem] font-[400] text-[#DEBDFD]">
                Unite. Pursue. Achieve. –
              </p>
              <p className="text-[1.125rem] leading-[1.75rem] tracking-[0.01125rem] font-[400] text-[#DEBDFD]">
                Your productivity hub.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen md:w-1/2">{children}</div>
    </div>
  );
}
