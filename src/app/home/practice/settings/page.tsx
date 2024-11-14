"use client";

import { styles } from "@/components/LanguageSelector";
import Spinner from "@/components/Spinner";
import { PageSwitch } from "@/components/transitions/PageSwitch";
import PageSwitchButton from "@/components/transitions/PageSwitchButton";
import axios from "axios";
import { Option, Select } from "bymax-react-select";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BiArrowBack, BiLogOut } from "react-icons/bi";

export default function Settings() {
  const [pageSwitch, setPageSwitch] = useState<boolean>(false);
  const [userGender, setUserGender] = useState<Option | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [personalities, setPersonalities] = useState<any>();
  const { data: session } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    age: "",
    email: "",
  });

  const gender: Option[] = useMemo(
    () => [
      { id: "1", label: "Masculino", value: "Masculino" },
      { id: "2", label: "Feminino", value: "Feminino" },
    ],
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const fetchPersonalities = async () => {
      const response = await axios.post(
        "/api/personality",
        { userId: session?.user.id },
        { headers: { "Content-Type": "application/json" } }
      );

      setPersonalities(await response.data.data);
    };

    fetchPersonalities();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "/api/user",
        { userId: session?.user.id },
        { headers: { "Content-Type": "application/json" } }
      );

      const user = (await response.data.data) || {};
      setUserData(user);

      const genderOption = gender.find((g) => g.value === user.gender);
      setUserGender(genderOption || null);
    };

    fetchData();
  }, [session?.user.id, gender]);

  const handleSave = async () => {
    setLoading(true);
    const { name, age, email } = userData;
    await axios.post(
      "/api/user",
      { name, age, email, gender: userGender?.value, userId: session?.user.id },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    setLoading(false);
  };
  if (!userData || !personalities) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-slate-700 text-slate-700">
        .
      </div>
    );
  }

  return (
    <motion.section
      exit={{ opacity: 0 }}
      className="flex justify-center h-full w-full max-w-lg gap-8 my-4"
    >
      <PageSwitch.TopToBottom />
      {pageSwitch && <PageSwitch.BottomToTop />}

      <section className="w-full">
        <div className="flex">
          <PageSwitchButton
            route="/home/practice/chats"
            setPageSwitch={setPageSwitch}
            className="p-2 rounded-full me-2 bg-slate-800 relative top-1"
          >
            <BiArrowBack />
          </PageSwitchButton>
        </div>

        <section className="my-4">
          <h1 className="text-2xl font-bold">Dados de usuário</h1>
          <hr className="border-1 border-slate-500 my-4" />

          <div>
            <label
              htmlFor="username"
              className="flex justify-between items-center"
            >
              Nome de usuário:
              <input
                type="text"
                name="name"
                id="username"
                value={userData.name || undefined}
                onChange={handleInputChange}
                autoComplete="off"
                className="outline-none w-72 rounded-md bg-slate-800 text-slate-300 p-2"
              />
            </label>
          </div>

          <div className="mt-4">
            <label
              htmlFor="genero"
              className="flex justify-between items-center"
            >
              Gênero:
              <div className="w-72">
                <Select
                  id="gender"
                  value={userGender || null}
                  styles={styles}
                  isMulti={false}
                  isClearable={false}
                  options={gender}
                  placeholder="Selecione o Gênero"
                  noOptionsMessage="Nenhum gênero encontrado"
                  onChange={(selectedOption: any) =>
                    setUserGender(selectedOption)
                  }
                />
              </div>
            </label>
          </div>

          <div className="mt-4">
            <label
              htmlFor="idade"
              className="flex justify-between items-center"
            >
              Idade:
              <input
                type="text"
                name="age"
                id="age"
                value={userData.age || undefined}
                onChange={handleInputChange}
                autoComplete="off"
                className="outline-none w-72 rounded-md bg-slate-800 text-slate-300 p-2"
              />
            </label>
          </div>

          <div className="mt-4">
            <label
              htmlFor="email"
              className="flex justify-between items-center"
            >
              E-mail:
              <input
                type="text"
                name="email"
                id="email"
                value={userData.email}
                readOnly
                className="outline-none w-72 rounded-md bg-slate-800 text-slate-500 p-2 cursor-not-allowed"
              />
            </label>
          </div>

          <div className="flex items-center justify-center">
            {loading ? (
              <Spinner />
            ) : (
              <button
                onClick={handleSave}
                className="my-4 hover:scale-125 transition ease-in-out duration-150 border-2 border-slate-800 hover:bg-slate-800 rounded-xl p-2 relative top-3"
              >
                <p className="font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-700 inline-block text-transparent bg-clip-text">
                  Salvar
                </p>
              </button>
            )}
          </div>
        </section>

        <hr className="border-1 border-slate-500 my-4" />

        <section>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Personalidades de IA</h1>
            <button
              onClick={() => window.location.reload()}
              className="underline"
            >
              Mostrar todas
            </button>
          </div>
          <div className="flex items-center justify-center">
            <PageSwitchButton
              setPageSwitch={setPageSwitch}
              route="/home/practice/settings/personality"
              className="my-4 hover:scale-125 transition ease-in-out duration-150 border-2 border-slate-800 hover:bg-slate-800 rounded-xl p-2 relative top-3"
            >
              <p className="font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-700 inline-block text-transparent bg-clip-text">
                Criar personalidade
              </p>
            </PageSwitchButton>
          </div>

          {personalities.map((item: any, index: number) => (
            <PageSwitchButton
              key={index}
              className="bg-slate-800 rounded-xl my-2"
              route={`/home/practice/settings/personality/${item.personalityId}`}
              setPageSwitch={setPageSwitch}
            >
              <section className="text-left p-4">
                <h1 className="text-2xl italic font-bold">{item.ai_name}</h1>
                <p className="line-clamp-3 text-slate-500">
                  {item.ai_personality}
                </p>
              </section>
            </PageSwitchButton>
          ))}
        </section>

        <hr className="border-1 border-slate-500 my-4" />

        <div>
          <button
            onClick={() => signOut({ callbackUrl: "" })}
            className="flex font-bold text-red-500"
          >
            <BiLogOut className="text-2xl me-2" /> Sair
          </button>
        </div>
      </section>
    </motion.section>
  );
}
