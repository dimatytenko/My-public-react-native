import { format } from "date-fns";

type TtoDateTime = (sec: number)=> string

export const toDateTime:TtoDateTime = function(sec) {
  var t = new Date(Date.UTC(1970, 0, 1));
  t.setUTCSeconds(sec);
  return format(t, "dd/MM/yyyy | kk:mm");
}
