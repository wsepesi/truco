export const BUILD_TYPES = {
	STAGING: 'staging',
	PRODUCTION: 'production',
	LOCAL: 'local'
};

export const getDomain = (): string => {
	if (window.location.host.indexOf('localhost') > -1) {
		return BUILD_TYPES.LOCAL;
	}
	else return BUILD_TYPES.PRODUCTION;
};

const getApiEndpoint = (): string => {
	switch (getDomain()) {
		case BUILD_TYPES.PRODUCTION: //TODO: fix
			return 'https://trucoserver.xyz/';
        case BUILD_TYPES.LOCAL:
            return 'http://localhost:5000/'
		// case BUILD_TYPES.STAGING:
		// 	return 'https://staging--services.4giving.com';
		default:
			return 'https://trucoserver.xyz/';
	}
};

// export const BASE_URL = "https://trucoserver.xyz/" 
export const BASE_URL = getApiEndpoint();