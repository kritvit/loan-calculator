
const thousandSeperatorUtil = (input: string): string => {
    let result = "";
    let count = 0;

    for (let i = input.length - 1; i >= 0; i--) {
        result = input[i] + result;
        count++;

        if (count % 3 === 0 && i > 0) {
            result = " " + result;
        }
    }

    return result;
};

export const toNumberUtil = (value: string): number => {
    const paresedNumber = parseFloat(value.split(" ").join(""));
    return !isNaN(paresedNumber) ? paresedNumber : 0;
};

export const toNumberFormattedStringUtil = (value: any): string => {
    const isNumber = typeof value === "number" && !isNaN(value);
    const isString = typeof value === "string";
    const safeValue =  isNumber ? value.toString() : isString ? value : "";
    const regex = /[^0-9.]+/g;
    const numericFloatSting = safeValue.replace(regex, "");
    const parts = numericFloatSting.split(".").slice(0, 2);
    parts[0] = thousandSeperatorUtil(parts[0]);
    if (parts[0] === "" && parts.length === 2) {
        parts[0] = "0";
    }
    if (parts[1]) {
        parts[1] = parts[1].substring(0, 2).toString();
    }
    return parts.join(".");
};

export const urlGetUtil = (search: string, defaultValue?: number): number => {
    const searchProps = location.search.replace("?", "").split("&");
    let output = defaultValue || 0;
    searchProps.forEach(prop => {
      const keyVal = prop.split("=");
      if (keyVal[0] === search) {
        const val = parseFloat(keyVal[1]);
        output = typeof val === "number" && !isNaN(val) ? val : 0;
      }
    });
    return output;
  };

  