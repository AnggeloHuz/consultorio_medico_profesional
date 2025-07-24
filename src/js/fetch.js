export function postFetch(data, path) {
  return new Promise((resolve, reject) => {
    fetch(path, {
      mode: "cors",
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
        return reject(error);
      })
      .then((response) => {
        return resolve(response);
      });
  });
}

export function postFetchPath(path) {
  return new Promise((resolve, reject) => {
    fetch(path, {
      mode: "cors",
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
        return reject(error);
      })
      .then((response) => {
        return resolve(response);
      });
  });
}

export function deleteFetch(path) {
  return new Promise((resolve, reject) => {
    fetch(path, {
      mode: "cors",
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
        return reject(error);
      })
      .then((response) => {
        return resolve(response);
      });
  });
}

export function getFetch(path) {
  return new Promise((resolve, reject) => {
    fetch(path, {
      mode: "cors",
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
        return reject(error);
      })
      .then((response) => {
        return resolve(response);
      });
  });
}

export function getFetchParams(path, params) {
  return new Promise((resolve, reject) => {
    fetch(path + params, {
      mode: "cors",
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
        return reject(error);
      })
      .then((response) => {
        return resolve(response);
      });
  });
}

export function postFetchParams(data, path, params) {
  return new Promise((resolve, reject) => {
    fetch(path + params, {
      mode: "cors",
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
        return reject(error);
      })
      .then((response) => {
        return resolve(response);
      });
  });
}

export function putFetchParams(data, path, params) {
  return new Promise((resolve, reject) => {
    fetch(path + params, {
      mode: "cors",
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
        return reject(error);
      })
      .then((response) => {
        return resolve(response);
      });
  });
}
