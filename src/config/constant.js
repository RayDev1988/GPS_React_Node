export const MACHINE_ENVIRONMENT = "prod"; //"dev", "prod"

let base_site_url = "";
let base_api_url = "";
if (MACHINE_ENVIRONMENT === "dev") {
    base_site_url = "http://192.168.0.72"
    base_api_url = "http://192.168.0.72:8088"
} else if (MACHINE_ENVIRONMENT === "prod") {
    base_site_url = "https://moovetrax.com"
    base_api_url = "https://moovetrax.com"
}

export const BASE_SITE_URL = base_site_url;
export const API_BASE_URL = base_api_url;
