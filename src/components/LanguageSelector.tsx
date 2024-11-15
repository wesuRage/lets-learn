"use client";

import { useMemo } from "react";
import { Select, Option } from "bymax-react-select";

export default function LanguageSelector({ option, setOption }: any) {
  const options: Option[] = useMemo(
    () => [
      { id: "54", label: "Africâner", value: "Africâner (af)" },
      { id: "25", label: "Akan", value: "Akan (ak)" },
      { id: "32", label: "Albanês", value: "Albanês (sq)" },
      { id: "61", label: "Alemão", value: "Alemão (de)" },
      { id: "5", label: "Amárico", value: "Amárico (am)" },
      { id: "13", label: "Árabe", value: "Árabe (ar)" },
      { id: "6", label: "Armênio", value: "Armênio (hy)" },
      { id: "11", label: "Assamês", value: "Assamês (as)" },
      { id: "63", label: "Azerbaijano", value: "Azerbaijano (az)" },
      { id: "50", label: "Basco", value: "Basco (eu)" },
      { id: "51", label: "Bengali", value: "Bengali (bn)" },
      { id: "43", label: "Bielorrusso", value: "Bielorrusso (be)" },
      { id: "52", label: "Birmanês", value: "Birmanês (my)" },
      { id: "30", label: "Bósnio", value: "Bósnio (bs)" },
      { id: "3", label: "Búlgaro", value: "Búlgaro (bg)" },
      { id: "59", label: "Canarês", value: "Canarês (kn)" },
      { id: "16", label: "Cazaque", value: "Cazaque (kk)" },
      { id: "42", label: "Cebuano", value: "Cebuano (ceb)" },
      { id: "70", label: "Chichewa", value: "Chichewa (ny)" },
      {
        id: "44",
        label: "Chinês (Simplificado)",
        value: "Chinês (Simplificado) (zh-CN)",
      },
      {
        id: "45",
        label: "Chinês (Tradicional)",
        value: "Chinês (Tradicional) (zh-TW)",
      },
      { id: "24", label: "Cingalês", value: "Cingalês (si)" },
      { id: "8", label: "Coreano", value: "Coreano (ko)" },
      { id: "41", label: "Crioulo haitiano", value: "Crioulo haitiano (ht)" },
      { id: "55", label: "Croata", value: "Croata (hr)" },
      { id: "33", label: "Curdo", value: "Curdo (ku)" },
      { id: "26", label: "Dinamarquês", value: "Dinamarquês (da)" },
      { id: "27", label: "Divehi", value: "Divehi (dv)" },
      { id: "29", label: "Eslovaco", value: "Eslovaco (sk)" },
      { id: "105", label: "Esloveno", value: "Esloveno (sl)" },
      { id: "1", label: "Espanhol", value: "Espanhol (es)" },
      { id: "15", label: "Esperanto", value: "Esperanto (eo)" },
      { id: "34", label: "Estoniano", value: "Estoniano (et)" },
      { id: "68", label: "Finlandês", value: "Finlandês (fi)" },
      { id: "47", label: "Francês", value: "Francês (fr)" },
      { id: "99", label: "Gaélico escocês", value: "Gaélico escocês (gd)" },
      { id: "101", label: "Gaélico irlandês", value: "Gaélico irlandês (ga)" },
      { id: "60", label: "Galego", value: "Galego (gl)" },
      { id: "35", label: "Galês", value: "Galês (cy)" },
      { id: "67", label: "Georgiano", value: "Georgiano (ka)" },
      { id: "4", label: "Grego", value: "Grego (el)" },
      { id: "87", label: "Guarani", value: "Guarani (gn)" },
      { id: "12", label: "Gujarati", value: "Gujarati (gu)" },
      { id: "86", label: "Hebraico", value: "Hebraico (he)" },
      { id: "84", label: "Hindi", value: "Hindi (hi)" },
      { id: "110", label: "Hmong", value: "Hmong (hmn)" },
      { id: "48", label: "Holandês", value: "Holandês (nl)" },
      { id: "36", label: "Húngaro", value: "Húngaro (hu)" },
      { id: "91", label: "Igbo", value: "Igbo (ig)" },
      { id: "109", label: "Iídiche", value: "Iídiche (yi)" },
      { id: "2", label: "Indonésio", value: "Indonésio (id)" },
      { id: "40", label: "Inglês", value: "Inglês (en)" },
      { id: "57", label: "Islandês", value: "Islandês (is)" },
      { id: "66", label: "Italiano", value: "Italiano (it)" },
      { id: "64", label: "Japonês", value: "Japonês (ja)" },
      { id: "18", label: "Javanês", value: "Javanês (jv)" },
      { id: "69", label: "Khmer", value: "Khmer (km)" },
      { id: "9", label: "Kinyarwanda", value: "Kinyarwanda (rw)" },
      { id: "38", label: "Kirundi", value: "Kirundi (rn)" },
      { id: "20", label: "Klingon", value: "Klingon (tlh)" },
      { id: "23", label: "Konkani", value: "Konkani (kok)" },
      { id: "46", label: "Kurdish (Sorani)", value: "Kurdish (Sorani) (ckb)" },
      { id: "19", label: "Laosiano", value: "Laosiano (lo)" },
      { id: "17", label: "Letão", value: "Letão (lv)" },
      { id: "56", label: "Lituano", value: "Lituano (lt)" },
      { id: "22", label: "Luganda", value: "Luganda (lg)" },
      { id: "103", label: "Luxemburguês", value: "Luxemburguês (lb)" },
      { id: "10", label: "Macedônio", value: "Macedônio (mk)" },
      { id: "31", label: "Malgaxe", value: "Malgaxe (mg)" },
      { id: "49", label: "Malaio", value: "Malaio (ms)" },
      { id: "39", label: "Malaiala", value: "Malaiala (ml)" },
      { id: "7", label: "Maltês", value: "Maltês (mt)" },
      { id: "85", label: "Maori", value: "Maori (mi)" },
      { id: "104", label: "Marathi", value: "Marathi (mr)" },
      { id: "37", label: "Mongol", value: "Mongol (mn)" },
      { id: "53", label: "Nepalês", value: "Nepalês (ne)" },
      { id: "71", label: "Norueguês", value: "Norueguês (no)" },
      { id: "73", label: "Oriá (Odia)", value: "Oriá (Odia) (or)" },
      { id: "62", label: "Oromo", value: "Oromo (om)" },
      { id: "98", label: "Pashto", value: "Pashto (ps)" },
      { id: "65", label: "Persa", value: "Persa (fa)" },
      { id: "94", label: "Polonês", value: "Polonês (pl)" },
      {
        id: "97",
        label: "Português (Brasil)",
        value: "Português (Brasil) (pt)",
      },
      {
        id: "72",
        label: "Português (Portugal)",
        value: "Português (Portugal) (pt-PT)",
      },
      { id: "21", label: "Punjabi", value: "Punjabi (pa)" },
      { id: "58", label: "Quechua", value: "Quechua (qu)" },
      { id: "102", label: "Romeno", value: "Romeno (ro)" },
      { id: "14", label: "Russo", value: "Russo (ru)" },
      { id: "28", label: "Samoano", value: "Samoano (sm)" },
      { id: "83", label: "Sérvio", value: "Sérvio (sr)" },
      { id: "88", label: "Sesotho", value: "Sesotho (st)" },
      { id: "95", label: "Sindi", value: "Sindi (sd)" },
      { id: "75", label: "Somali", value: "Somali (so)" },
      { id: "90", label: "Soto do Sul", value: "Soto do Sul (nso)" },
      { id: "92", label: "Suaíli", value: "Suaíli (sw)" },
      { id: "100", label: "Sueco", value: "Sueco (sv)" },
      { id: "77", label: "Tadjique", value: "Tadjique (tg)" },
      { id: "74", label: "Tailandês", value: "Tailandês (th)" },
      { id: "79", label: "Tâmil", value: "Tâmil (ta)" },
      { id: "81", label: "Tártaro", value: "Tártaro (tt)" },
      { id: "93", label: "Telugo", value: "Telugo (te)" },
      { id: "78", label: "Tétum", value: "Tétum (tet)" },
      { id: "76", label: "Tibetano", value: "Tibetano (bo)" },
      { id: "82", label: "Tonga", value: "Tonga (to)" },
      { id: "80", label: "Tsonga", value: "Tsonga (ts)" },
      { id: "107", label: "Turco", value: "Turco (tr)" },
      { id: "108", label: "Turcomeno", value: "Turcomeno (tk)" },
      { id: "89", label: "Ucraniano", value: "Ucraniano (uk)" },
      { id: "106", label: "Urdu", value: "Urdu (ur)" },
      { id: "58", label: "Uzbeque", value: "Uzbeque (uz)" },
      { id: "96", label: "Vietnamita", value: "Vietnamita (vi)" },
      { id: "111", label: "Xhosa", value: "Xhosa (xh)" },
      { id: "112", label: "Zulu", value: "Zulu (zu)" },
    ],
    []
  );

  return (
    <div className="text-black max-w-72">
      <Select
        id="language-selector"
        styles={styles}
        value={option ?? ""}
        isMulti={false}
        isClearable={false}
        options={options}
        placeholder="Selecione um idioma"
        noOptionsMessage="Idioma não encontrado"
        onChange={(selectedOption) => setOption(selectedOption)}
      />
    </div>
  );
}

export const styles = {
  control: () => ({
    outlineStyle: "none",
    backgroundColor: "#1e293b",
    borderColor: "#1e293b",
    borderRadius: "8px",
    padding: "5px",
    boxShadow: "none",
    "&:hover": { borderColor: "#0f172a" },
  }),
  placeholder: () => ({
    color: "#a0a0a0",
    fontSize: "14px",
  }),
  option: () => ({
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: "10px",
    "&:hover": { backgroundColor: "#0f172a" },
  }),
  menu: () => ({
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "5px",
  }),
  singleValue: () => ({
    color: "#fff",
  }),
  noOptionsMessage: () => ({
    backgroundColor: "#1e293b",
    color: "#ff6b6b",
    fontSize: "14px",
  }),
};
