export * from "./toDateTime.js";

export function chengePaddingBottom(
  isShowKeyboard,
  dimensions
) {
  if (dimensions > 600) {
    return 16;
  }
  if (isShowKeyboard) {
    return 16;
  } else {
    return 92;
  }
}
