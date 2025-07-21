// src/utils/storage.js

// Generic helpers
export const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};

// Specific helpers
export const getAllEmployees = () => getFromStorage("employee-users") || [];

export const saveEmployee = (employee) => {
  const all = getAllEmployees();
  all.push(employee);
  saveToStorage("employee-users", all);
};

export const getAllLeaves = () => getFromStorage("employee-leaves") || [];

export const saveLeave = (leave) => {
  const all = getAllLeaves();
  all.push(leave);
  saveToStorage("employee-leaves", all);
};
