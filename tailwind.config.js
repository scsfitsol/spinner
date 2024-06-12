// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "var(--Text_pr, #1A1C3C)",
        buttonColor:"#D6E4BE",
        hoveColor:"#c0cdaa",
        primary: "var(--primary-p-500, #060DBF)",
        hemanth: "var(--secondary-s-500, #62C941)",
        pothu: "var(--Text_sn, #4D4F67)",
        bordcol: "var(--Border_light, #B3B3BE)",
        col1: "var(--neutral-n-40, #EBEBEE)",
        col2: "var(--Surface_pr, #F5F5F6)",
        col3: "var(--neutral-n-300, #999AA8)",
        col4: "var(--neutral-n-10, #FAFAFB)",
        col5: "var(--Text_pr, #1A1C3C)",
        col6: "var(--emerald-e-100, #D1FAE5)",
        col7: "var(--Text_success, #059669)",
        col8: "var(--primary-p-600, #050A99)",
        col9: "var(--Text_sn, #4D4F67)",
        col10: "var(--secondary-s-600, #4EA134)",
        col11:
          "linear-gradient(161deg, #9B9EE5 -35.07%, #CDCFF2 36.9%, #E6E7F9 93.52%)",
        col12: "#EEE",
        col13: "var(--neutral-n-700, #343551)",
        col14: "var(--neutral-n-400, #808193)",
        col15: "var(--primary-p-500, #060DBF)",
        col16: "var(--neutral-n-200, #B3B3BE)",
        col17:"var(--primary-p-50, #E6E7F9)",
        col18:"var(--primary-p-700, #040873)",
        col19:"var(--secondary-s-500, #62C941)",
        col20:"var(--primary-p-100, #CDCFF2)",
        col21:"radial-gradient(305.31% 146.87% at 11.72% 12.24%, #383DCC 0%, #050A99 21.99%, #050A99 31.45%, #000 96.46%)",
        col22:"#E6E6E9"
      },
    },
  },
  plugins: [],
};
