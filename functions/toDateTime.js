import { format } from "date-fns";

export function toDateTime(secs) {
  var t = new Date(Date.UTC(1970, 0, 1));
  t.setUTCSeconds(secs);
  return format(t, "dd/MM/yyyy | kk:mm");
}
