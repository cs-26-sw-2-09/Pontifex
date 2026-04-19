import Cookies from "js-cookie";

export function setCookie(key: string, value: string, days = 1) {
	Cookies.set(key, value, { expires: days, sameSite: "Strict" });
}

export function getCookie(key: string): string | undefined {
	return Cookies.get(key);
}

export function deleteCookie(key: string) {
	Cookies.remove(key);
}
