enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

interface Options {
	method?: METHODS;
  timeout?: number;
  headers?: Record<string, string>;
  data?: any;
}

function queryStringify(data: { [x: string]: any; }) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export class HTTPTransport {
  get = (url: any, options: Options = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post = (url: any, options: Options = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put = (url: any, options: Options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete = (url: any, options: Options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url: string | URL, options: Options = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}