"use client";

import { useMemo } from "react";
import { Select, Option } from "bymax-react-select";

export default function LanguageSelector({ option, setOption }: any) {
  const options: Option[] = useMemo(
    () => [
      { id: "0", label: "Albanian, Albania", value: "Albanian, Albania" },
      { id: "1", label: "Arabic, Arab World", value: "Arabic, Arab World" },
      { id: "2", label: "Armenian, Armenia", value: "Armenian, Armenia" },
      { id: "3", label: "Awadhi, India", value: "Awadhi, India" },
      {
        id: "4",
        label: "Azerbaijani, Azerbaijan",
        value: "Azerbaijani, Azerbaijan",
      },
      { id: "5", label: "Bashkir, Russia", value: "Bashkir, Russia" },
      { id: "6", label: "Basque, Spain", value: "Basque, Spain" },
      { id: "7", label: "Belarusian, Belarus", value: "Belarusian, Belarus" },
      { id: "8", label: "Bengali, Bangladesh", value: "Bengali, Bangladesh" },
      { id: "9", label: "Bhojpuri, India", value: "Bhojpuri, India" },
      {
        id: "10",
        label: "Bosnian, Bosnia and Herzegovina",
        value: "Bosnian, Bosnia and Herzegovina",
      },
      {
        id: "11",
        label: "Brazilian Portuguese, Brazil",
        value: "Brazilian Portuguese, Brazil",
      },
      { id: "12", label: "Bulgarian, Bulgaria", value: "Bulgarian, Bulgaria" },
      {
        id: "13",
        label: "Cantonese (Yue), China",
        value: "Cantonese (Yue), China",
      },
      { id: "14", label: "Catalan, Spain", value: "Catalan, Spain" },
      {
        id: "15",
        label: "Chhattisgarhi, India",
        value: "Chhattisgarhi, India",
      },
      { id: "16", label: "Chinese, China", value: "Chinese, China" },
      { id: "17", label: "Croatian, Croatia", value: "Croatian, Croatia" },
      {
        id: "18",
        label: "Czech, Czech Republic",
        value: "Czech, Czech Republic",
      },
      { id: "19", label: "Danish, Denmark", value: "Danish, Denmark" },
      { id: "20", label: "Dogri, India", value: "Dogri, India" },
      { id: "21", label: "Dutch, Netherlands", value: "Dutch, Netherlands" },
      {
        id: "22",
        label: "English, United States",
        value: "English, United States",
      },
      { id: "23", label: "Estonian, Estonia", value: "Estonian, Estonia" },
      {
        id: "24",
        label: "Faroese, Faroe Islands",
        value: "Faroese, Faroe Islands",
      },
      { id: "25", label: "Finnish, Finland", value: "Finnish, Finland" },
      { id: "26", label: "French, France", value: "French, France" },
      { id: "27", label: "Galician, Spain", value: "Galician, Spain" },
      { id: "28", label: "Georgian, Georgia", value: "Georgian, Georgia" },
      { id: "29", label: "German, Germany", value: "German, Germany" },
      { id: "30", label: "Greek, Greece", value: "Greek, Greece" },
      { id: "31", label: "Gujarati, India", value: "Gujarati, India" },
      { id: "32", label: "Haryanvi, India", value: "Haryanvi, India" },
      { id: "33", label: "Hindi, India", value: "Hindi, India" },
      { id: "34", label: "Hungarian, Hungary", value: "Hungarian, Hungary" },
      {
        id: "35",
        label: "Indonesian, Indonesia",
        value: "Indonesian, Indonesia",
      },
      { id: "36", label: "Irish, Ireland", value: "Irish, Ireland" },
      { id: "37", label: "Italian, Italy", value: "Italian, Italy" },
      { id: "38", label: "Japanese, Japan", value: "Japanese, Japan" },
      { id: "39", label: "Javanese, Indonesia", value: "Javanese, Indonesia" },
      { id: "40", label: "Kannada, India", value: "Kannada, India" },
      { id: "41", label: "Kashmiri, India", value: "Kashmiri, India" },
      { id: "42", label: "Kazakh, Kazakhstan", value: "Kazakh, Kazakhstan" },
      { id: "43", label: "Konkani, India", value: "Konkani, India" },
      { id: "44", label: "Korean, South Korea", value: "Korean, South Korea" },
      { id: "45", label: "Kyrgyz, Kyrgyzstan", value: "Kyrgyz, Kyrgyzstan" },
      { id: "46", label: "Latvian, Latvia", value: "Latvian, Latvia" },
      {
        id: "47",
        label: "Lithuanian, Lithuania",
        value: "Lithuanian, Lithuania",
      },
      {
        id: "48",
        label: "Macedonian, North Macedonia",
        value: "Macedonian, North Macedonia",
      },
      { id: "49", label: "Maithili, India", value: "Maithili, India" },
      { id: "50", label: "Malay, Malaysia", value: "Malay, Malaysia" },
      { id: "51", label: "Maltese, Malta", value: "Maltese, Malta" },
      { id: "52", label: "Mandarin, China", value: "Mandarin, China" },
      {
        id: "53",
        label: "Mandarin Chinese, China",
        value: "Mandarin Chinese, China",
      },
      { id: "54", label: "Marathi, India", value: "Marathi, India" },
      { id: "55", label: "Marwari, India", value: "Marwari, India" },
      { id: "56", label: "Min Nan, China", value: "Min Nan, China" },
      { id: "57", label: "Moldovan, Moldova", value: "Moldovan, Moldova" },
      { id: "58", label: "Mongolian, Mongolia", value: "Mongolian, Mongolia" },
      {
        id: "59",
        label: "Montenegrin, Montenegro",
        value: "Montenegrin, Montenegro",
      },
      { id: "60", label: "Nepali, Nepal", value: "Nepali, Nepal" },
      { id: "61", label: "Norwegian, Norway", value: "Norwegian, Norway" },
      { id: "62", label: "Oriya, India", value: "Oriya, India" },
      { id: "63", label: "Pashto, Afghanistan", value: "Pashto, Afghanistan" },
      {
        id: "64",
        label: "Persian (Farsi), Iran",
        value: "Persian (Farsi), Iran",
      },
      { id: "65", label: "Polish, Poland", value: "Polish, Poland" },
      {
        id: "66",
        label: "Portuguese, Portugal",
        value: "Portuguese, Portugal",
      },
      { id: "67", label: "Punjabi, India", value: "Punjabi, India" },
      { id: "68", label: "Romanian, Romania", value: "Romanian, Romania" },
      { id: "69", label: "Russian, Russia", value: "Russian, Russia" },
      {
        id: "70",
        label: "Scottish Gaelic, Scotland",
        value: "Scottish Gaelic, Scotland",
      },
      { id: "71", label: "Serbian, Serbia", value: "Serbian, Serbia" },
      { id: "72", label: "Sindhi, India", value: "Sindhi, India" },
      { id: "73", label: "Sinhala, Sri Lanka", value: "Sinhala, Sri Lanka" },
      { id: "74", label: "Slovak, Slovakia", value: "Slovak, Slovakia" },
      { id: "75", label: "Slovenian, Slovenia", value: "Slovenian, Slovenia" },
      { id: "76", label: "Somali, Somalia", value: "Somali, Somalia" },
      { id: "77", label: "Spanish, Spain", value: "Spanish, Spain" },
      {
        id: "78",
        label: "Sundanese, Indonesia",
        value: "Sundanese, Indonesia",
      },
      { id: "79", label: "Swahili, Africa", value: "Swahili, Africa" },
      { id: "80", label: "Swedish, Sweden", value: "Swedish, Sweden" },
      { id: "81", label: "Tamil, India", value: "Tamil, India" },
      { id: "82", label: "Telugu, India", value: "Telugu, India" },
      { id: "83", label: "Thai, Thailand", value: "Thai, Thailand" },
      { id: "84", label: "Turkish, Turkey", value: "Turkish, Turkey" },
      { id: "85", label: "Ukrainian, Ukraine", value: "Ukrainian, Ukraine" },
      { id: "86", label: "Urdu, Pakistan", value: "Urdu, Pakistan" },
      { id: "87", label: "Uzbek, Uzbekistan", value: "Uzbek, Uzbekistan" },
      { id: "88", label: "Vietnamese, Vietnam", value: "Vietnamese, Vietnam" },
      { id: "89", label: "Welsh, Wales", value: "Welsh, Wales" },
      { id: "90", label: "Xhosa, South Africa", value: "Xhosa, South Africa" },
      { id: "91", label: "Yoruba, Nigeria", value: "Yoruba, Nigeria" },
      { id: "92", label: "Zulu, South Africa", value: "Zulu, South Africa" },
    ],
    []
  );

  return (
    <div className="text-black max-w-72">
      <Select
        id="language-selector"
        value={option ?? ""}
        isMulti={false}
        isClearable={false}
        options={options}
        placeholder="Select a language"
        noOptionsMessage="Language not found"
        onChange={(selectedOption) => setOption(selectedOption)}
      />
    </div>
  );
}
