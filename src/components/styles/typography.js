import * as Color from "./colors";
import * as Spacing from "./spacing";

export const extraLargeFontSize = 32;
export const largeFontSize = 26;
export const buttonFontSize = 18;
export const baseFontSize = 16;
export const smallFontSize = 14;
export const smallestFontSize = 10;
export const largeHeaderFontSize = 20;
export const headerFontSize = 18;

export const heavy = "800";
export const medium = "600";

export const fontFamily = "Avenir";

const base = {};

export const screenHeader = {
    fontFamily: fontFamily,
    color: Color.primaryText,
    fontSize: largeFontSize,
    fontWeight: "600",
    letterSpacing: 0.02
};

export const header = {
    fontSize: largeHeaderFontSize,
    fontFamily: fontFamily,
    fontWeight: "600"
};

export const prompt = {
    fontFamily: fontFamily,
    fontSize: baseFontSize,
    fontWeight: "400",
    color: Color.gray,
    letterSpacing: 0.25
};

export const bodyText = {
    fontFamily: fontFamily,
    fontSize: baseFontSize,
    color: Color.black,
    letterSpacing: 0.5
};
