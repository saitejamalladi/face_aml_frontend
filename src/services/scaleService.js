import axios from "../utils/axios";

export function addAccount(token, account) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .post("/api/account", account, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function editAccount(token, account) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .put("/api/account", account, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function fetchAccounts(token) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/account/info", authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function fetchChildAccounts(token, accountId) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/account/child/" + accountId, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function addUser(token, user) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .post("/api/user", user, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function updateUser(token, user) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .put("/api/user", user, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function deleteUser(token, username) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .delete("/api/user/" + username, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function fetchUsers(token) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/user/list", authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function fetchDevices(token, accountId) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/device/list/" + accountId, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function fetchScales(token, accountId) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/scale/all/" + accountId, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function fetchLocations(token, accountId) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/location/" + accountId, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function addMealCount(token, mealCount) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .post("/api/meal-count", mealCount, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function updateMealCount(token, mealCount) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .put("/api/meal-count", mealCount, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function fetchMealCount(token) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/meal-count", authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function fetchBenchmark(token) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/meal-count/benchmark", authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function updateBenchmark(token, benchmarkObj) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .put("/api/meal-count/benchmark", benchmarkObj, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function fetchReport(token, accountId, reportDate) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(`/api/scale/report/${accountId}/${reportDate}`, authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function fetchPermissions(token) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/user/permissions", authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
