const browser = chrome || browser;

function get(key) {
	return new Promise(resolve => {
		browser.storage.local.get([key], result => {
			resolve(result[key]);
		});
	});
};

browser.webRequest.onBeforeRequest.addListener((details) => {
	return {redirectUrl: chrome.runtime.getURL("inject.js")};
}, {
	urls: ["https://www.edutyping.com/dist/student/js/app.min*"],
	types: ["script", "xmlhttprequest"],
}, ["blocking"]);