import Cookies from "js-cookie";

export function setUserCookie(value: number, days = 30) {
	Cookies.set("user", value.toString(), { expires: days, sameSite: "Strict" });
}

export function getUserCookie(): number | undefined {
	return Number(Cookies.get("user"));
}

export function deleteUserCookie() {
	Cookies.remove("user");
}
